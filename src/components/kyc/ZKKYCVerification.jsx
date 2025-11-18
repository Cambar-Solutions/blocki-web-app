import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../Button';
import { Input, Label } from '../ui/input';
import { Badge } from '../ui/badge';
import { useZKKYC } from '../../hooks/useZKKYC';
import {
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  FileCheck,
  Info
} from 'lucide-react';

/**
 * @typedef {Object} ZKKYCVerificationProps
 * @property {string} [userPublicKey]
 */

/**
 * Zero-Knowledge KYC Verification Component
 *
 * Demonstrates privacy-preserving identity verification using ZK proofs.
 * Users can prove they meet requirements (age 18+, LATAM residency) WITHOUT
 * revealing their actual personal data.
 *
 * @param {ZKKYCVerificationProps} props
 */
export function ZKKYCVerification({ userPublicKey }) {
  const { proof, isVerified, isLoading, generateProof, submitToBlockchain, createCredential } = useZKKYC();

  const [formData, setFormData] = useState({
    age: '',
    country: '',
    verified: false
  });

  const [showPrivateData, setShowPrivateData] = useState(false);

  const handleGenerateProof = async () => {
    if (!formData.age || !formData.country) {
      return;
    }

    const zkProof = await generateProof(
      parseInt(formData.age),
      formData.country,
      formData.verified
    );

    if (zkProof && userPublicKey) {
      // Optionally submit to blockchain
      await submitToBlockchain(zkProof, userPublicKey);
      await createCredential(zkProof, userPublicKey);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with ZK Explanation */}
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl mb-2 flex items-center gap-2">
                Zero-Knowledge KYC Verification
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100">
                  <Sparkles className="w-3 h-3 mr-1" />
                  ZK-Powered
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm">
                Verifica tu identidad sin revelar información personal. Demuestra que cumples los requisitos
                (edad +18, residencia LATAM) usando <strong>Zero-Knowledge Proofs</strong> criptográficos.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Info className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">¿Cómo funciona?</p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li>Genera una prueba criptográfica que demuestra que cumples los requisitos</li>
                  <li>La prueba NO revela tu edad exacta, nacionalidad, o datos personales</li>
                  <li>Cualquiera puede verificar la prueba sin acceder a tus datos privados</li>
                  <li>La verificación se registra en Stellar blockchain de forma inmutable</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Verification Form */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Private Data Input (Hidden after proof generation) */}
        <Card className={`zk-private-section ${isVerified ? 'opacity-50' : ''}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-500" />
              Datos Privados
              {!showPrivateData && isVerified && (
                <Badge variant="outline" className="ml-auto">
                  <EyeOff className="w-3 h-3 mr-1" />
                  Oculto
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Estos datos solo se usan para generar la prueba y nunca se almacenan ni comparten
            </CardDescription>
          </CardHeader>

          <CardContent>
            {(!isVerified || showPrivateData) ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Edad *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={isVerified}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ⚠️ Dato privado - No se guarda ni comparte
                  </p>
                </div>

                <div>
                  <Label htmlFor="country">País de Residencia *</Label>
                  <select
                    id="country"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    disabled={isVerified}
                  >
                    <option value="">Selecciona un país</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="Perú">Perú</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Bolivia">Bolivia</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    ⚠️ Dato privado - No se guarda ni comparte
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    disabled={isVerified}
                    className="rounded"
                  />
                  <Label htmlFor="verified" className="cursor-pointer">
                    Tengo documentos de identidad verificados
                  </Label>
                </div>

                {!isVerified && (
                  <Button
                    onClick={handleGenerateProof}
                    disabled={isLoading || !formData.age || !formData.country}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>Generando Prueba ZK...</>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Generar Prueba Zero-Knowledge
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <EyeOff className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500 mb-4">
                  Tus datos privados están protegidos
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrivateData(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Mostrar datos temporalmente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: Public Proof Output */}
        <Card className={`zk-public-section ${isVerified ? 'border-2 border-green-500 dark:border-green-700' : ''}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              Información Pública (ZK Proof)
              {isVerified && (
                <Badge className="ml-auto bg-green-500 hover:bg-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verificado
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Solo se comparte la prueba criptográfica, no tus datos personales
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isVerified && proof ? (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                        Verificación Completada
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300">Mayor de 18 años:</span>
                          <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-300">
                            ✓ Verificado
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300">Residencia LATAM:</span>
                          <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-300">
                            ✓ Verificado
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300">Identidad Verificada:</span>
                          <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-300">
                            ✓ Verificado
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Prueba Criptográfica (Resumen)
                  </Label>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-xs break-all">
                    {proof.proof.substring(0, 100)}...
                  </div>
                  <p className="text-xs text-gray-500">
                    Esta prueba puede ser verificada por cualquiera sin revelar tus datos privados
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Descargar Credencial
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Shield className="w-4 h-4 mr-2" />
                    Ver en Blockchain
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Genera tu prueba ZK para ver la verificación pública
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      {isVerified && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Beneficios de ZK-KYC
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Privacidad total de tus datos personales</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Verificación instantánea y reutilizable</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Cumplimiento regulatorio sin comprometer privacidad</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Registro inmutable en Stellar blockchain</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
