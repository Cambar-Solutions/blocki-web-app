import { useWallet } from '../../hooks/useWallet';
import { Button } from '../Button';
import { Wallet, LogOut, AlertCircle } from 'lucide-react';
import { Spinner } from '../ui/spinner';
import { Badge } from '../ui/badge';

/**
 * Wallet connection component
 * Displays connect button or wallet status with disconnect option
 */
export default function WalletConnect() {
  const { publicKey, isConnected, isLoading, error, network, connect, disconnect } =
    useWallet();

  if (isLoading) {
    return (
      <Button disabled variant="outline" size="sm">
        <Spinner size="sm" className="mr-2" />
        Loading...
      </Button>
    );
  }

  if (error && !isConnected) {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-destructive" />
        <Button onClick={connect} variant="outline" size="sm">
          <Wallet className="w-4 h-4 mr-2" />
          Retry Connection
        </Button>
      </div>
    );
  }

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-mono font-medium">
            {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
          </span>
          {network && (
            <Badge variant={network === 'TESTNET' ? 'warning' : 'success'} className="text-xs">
              {network}
            </Badge>
          )}
        </div>
        <Button onClick={disconnect} variant="outline" size="sm">
          <LogOut className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={connect} size="sm">
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
}
