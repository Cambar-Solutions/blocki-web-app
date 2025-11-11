import { useWallet } from '../hooks/useWallet';
import { useAccountBalance } from '../hooks/useStellar';

export default function WalletConnect() {
  const { publicKey, connected, loading, connect, disconnect, isFreighterInstalled } = useWallet();
  const { data: balances, isLoading: balancesLoading } = useAccountBalance(publicKey);

  if (!isFreighterInstalled) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 mb-2">
          Freighter wallet is not installed.
        </p>
        <a
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-900 underline hover:text-yellow-700"
        >
          Install Freighter
        </a>
      </div>
    );
  }

  if (!connected) {
    return (
      <button
        onClick={connect}
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800 mb-2">Connected Wallet</p>
        <p className="font-mono text-xs break-all text-green-900">{publicKey}</p>
      </div>

      {balancesLoading ? (
        <p className="text-gray-600">Loading balances...</p>
      ) : (
        balances && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Balances</h3>
            <div className="space-y-2">
              {balances.map((balance, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">
                    {balance.asset_type === 'native' ? 'XLM' : balance.asset_code}
                  </span>
                  <span className="font-mono">{parseFloat(balance.balance).toFixed(7)}</span>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      <button
        onClick={disconnect}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
}
