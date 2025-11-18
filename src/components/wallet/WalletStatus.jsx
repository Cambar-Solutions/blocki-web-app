import { useWallet } from '../../hooks/useWallet';
import { useUser } from '../../hooks/useUser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Wallet, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

/**
 * Wallet status display component
 * Shows connected wallet details, network, and KYC status
 */
export default function WalletStatus() {
  const { publicKey, isConnected, network } = useWallet();
  const { data: user } = useUser();

  if (!isConnected || !publicKey) {
    return null;
  }

  const getKYCBadge = () => {
    if (!user) return null;

    switch (user.kycStatus) {
      case 'approved':
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            KYC Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            KYC Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            KYC Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            KYC Not Started
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Status
        </CardTitle>
        <CardDescription>Connected wallet information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Public Key
          </p>
          <p className="text-sm font-mono break-all">{publicKey}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Network</p>
          <Badge variant={network === 'TESTNET' ? 'warning' : 'success'}>
            {network}
          </Badge>
        </div>

        {user && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">KYC Status</p>
              {getKYCBadge()}
            </div>

            {user.email && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Email
                </p>
                <p className="text-sm">{user.email}</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
