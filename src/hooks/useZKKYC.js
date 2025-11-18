import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import {
  generateKYCProof,
  verifyKYCProof,
  submitProofToStellar,
  createVerifiableCredential
} from '../services/zkKYC';

/**
 * @typedef {import('../services/zkKYC').ZKProof} ZKProof
 */

/**
 * React Hook for Zero-Knowledge KYC
 *
 * Enables privacy-preserving identity verification where users can prove
 * they meet requirements without revealing personal information
 *
 * @returns {{
 *   proof: ZKProof | null,
 *   credential: string | null,
 *   isVerified: boolean,
 *   isLoading: boolean,
 *   error: string | null,
 *   generateProof: (userAge: number, userCountry: string, verificationStatus: boolean) => Promise<ZKProof | null>,
 *   submitToBlockchain: (zkProof: ZKProof, userPublicKey: string) => Promise<string | null>,
 *   createCredential: (zkProof: ZKProof, userPublicKey: string) => Promise<string | null>,
 *   verifyProof: (zkProof: ZKProof) => Promise<boolean>
 * }}
 */
export function useZKKYC() {
  const [state, setState] = useState({
    proof: null,
    credential: null,
    isVerified: false,
    isLoading: false,
    error: null
  });

  /**
   * Generate ZK proof for KYC verification
   * User proves age >= 18, LATAM residency, and verification status
   * WITHOUT revealing actual age, country, or personal data
   */
  const generateProof = useCallback(async (userAge, userCountry, verificationStatus) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      toast.loading('Generando prueba criptográfica ZK...', { id: 'zk-proof' });

      // Generate the zero-knowledge proof
      const zkProof = await generateKYCProof(userAge, userCountry, verificationStatus);

      // Verify the proof (can be done by any party)
      const isValid = await verifyKYCProof(zkProof);

      if (!isValid) {
        throw new Error('Proof generation failed validation');
      }

      toast.success('✅ Prueba ZK generada exitosamente', { id: 'zk-proof' });

      setState(prev => ({
        ...prev,
        proof: zkProof,
        isVerified: true,
        isLoading: false
      }));

      return zkProof;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error generando prueba ZK';

      toast.error(errorMsg, { id: 'zk-proof' });

      setState(prev => ({
        ...prev,
        error: errorMsg,
        isLoading: false
      }));

      return null;
    }
  }, []);

  /**
   * Submit ZK proof to Stellar blockchain
   * Only a cryptographic commitment is stored on-chain, preserving privacy
   */
  const submitToBlockchain = useCallback(async (zkProof, userPublicKey) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      toast.loading('Enviando a Stellar blockchain...', { id: 'zk-submit' });

      // Submit proof commitment to Stellar
      const txHash = await submitProofToStellar(zkProof, userPublicKey);

      toast.success(`✅ Commitment registrado: ${txHash.substring(0, 10)}...`, {
        id: 'zk-submit'
      });

      setState(prev => ({ ...prev, isLoading: false }));

      return txHash;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error enviando a blockchain';

      toast.error(errorMsg, { id: 'zk-submit' });

      setState(prev => ({
        ...prev,
        error: errorMsg,
        isLoading: false
      }));

      return null;
    }
  }, []);

  /**
   * Create a reusable verifiable credential from ZK proof
   * Can be used across the platform without re-verification
   */
  const createCredential = useCallback(async (zkProof, userPublicKey) => {
    try {
      const { credential, expiresAt } = await createVerifiableCredential(
        zkProof,
        userPublicKey
      );

      setState(prev => ({
        ...prev,
        credential
      }));

      toast.success('📜 Credencial verificable creada', {
        duration: 3000
      });

      return credential;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error creando credencial';
      toast.error(errorMsg);
      return null;
    }
  }, []);

  /**
   * Verify an existing ZK proof
   */
  const verifyProof = useCallback(async (zkProof) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const isValid = await verifyKYCProof(zkProof);

      setState(prev => ({
        ...prev,
        isVerified: isValid,
        isLoading: false
      }));

      return isValid;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Verification failed',
        isLoading: false
      }));

      return false;
    }
  }, []);

  return {
    ...state,
    generateProof,
    submitToBlockchain,
    createCredential,
    verifyProof
  };
}
