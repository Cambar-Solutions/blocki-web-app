import WalletConnect from '../components/WalletConnect';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Wallet</h2>
              <WalletConnect />
            </div>
          </div>

          {/* Info Sections */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Transactions</h2>
              <p className="text-gray-600">View your transaction history</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Assets</h2>
              <p className="text-gray-600">Manage your Stellar assets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
