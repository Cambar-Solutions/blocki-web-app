import { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input, Label } from '../components/ui/Input'
import { getUserPortfolio } from '../data/mockPortfolio'
import {
  Wallet as WalletIcon,
  Copy,
  ExternalLink,
  Shield,
  Send,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Coins,
} from 'lucide-react'
import { formatCurrency, truncateAddress } from '../lib/utils'
import toast from 'react-hot-toast'

export function Wallet() {
  const portfolio = getUserPortfolio()
  const [sendAmount, setSendAmount] = useState('')
  const [sendAddress, setSendAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const walletBalance = {
    xlm: 1250.50,
    usdValue: 312.63,
    blocki: portfolio.summary.totalTokens,
    blockiValue: portfolio.summary.currentValue,
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(portfolio.user.walletAddress)
    toast.success('Dirección copiada al portapapeles')
  }

  const handleSend = () => {
    if (!sendAmount || !sendAddress) {
      toast.error('Por favor completa todos los campos')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Transacción enviada exitosamente')
      setSendAmount('')
      setSendAddress('')
    }, 2000)
  }

  const recentTransactions = [
    {
      id: '1',
      type: 'receive',
      amount: 100,
      asset: 'XLM',
      from: 'GXXXXXXXXXXXXXXXXXXXX',
      date: '2025-01-15 14:30',
      status: 'completed',
      hash: 'abc123...',
    },
    {
      id: '2',
      type: 'send',
      amount: 50,
      asset: 'XLM',
      to: 'GYYYYYYYYYYYYYYYYYYYYY',
      date: '2025-01-14 10:15',
      status: 'completed',
      hash: 'def456...',
    },
    {
      id: '3',
      type: 'receive',
      amount: 5,
      asset: 'BLOCKI',
      from: 'GZZZZZZZZZZZZZZZZZZZZZ',
      date: '2025-01-13 16:45',
      status: 'completed',
      hash: 'ghi789...',
    },
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mi Billetera
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra tus activos en Stellar Network
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet Info & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Address */}
            <Card className="wallet-address bg-gradient-to-br from-blue-600 to-purple-600 border-0">
              <CardContent className="p-6 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-blue-100 text-sm mb-2">Tu Dirección Stellar</p>
                    <div className="flex items-center gap-3">
                      <code className="text-lg font-mono font-semibold">
                        {truncateAddress(portfolio.user.walletAddress, 8)}
                      </code>
                      <button
                        onClick={handleCopyAddress}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://stellar.expert/explorer/public/account/${portfolio.user.walletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Shield className="w-4 h-4 text-green-300" />
                    <span className="text-sm font-semibold">Verificada</span>
                  </div>
                </div>

                {/* Balance Cards */}
                <div className="balance-cards grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 text-blue-100 text-sm mb-2">
                      <Coins className="w-4 h-4" />
                      <span>XLM Balance</span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{walletBalance.xlm.toFixed(2)}</p>
                    <p className="text-blue-100 text-xs">≈ ${walletBalance.usdValue.toFixed(2)} USD</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 text-blue-100 text-sm mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>BLOCKI Tokens</span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{walletBalance.blocki}</p>
                    <p className="text-blue-100 text-xs">≈ {formatCurrency(walletBalance.blockiValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex-col h-auto py-4 gap-2"
              >
                <Send className="w-6 h-6" />
                <span className="text-sm">Enviar</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-auto py-4 gap-2"
              >
                <Download className="w-6 h-6" />
                <span className="text-sm">Recibir</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-auto py-4 gap-2"
              >
                <RefreshCw className="w-6 h-6" />
                <span className="text-sm">Actualizar</span>
              </Button>
            </div>

            {/* Send Form */}
            <Card className="send-form">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Enviar Fondos</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                  <div>
                    <Label>Dirección de Destino</Label>
                    <Input
                      type="text"
                      placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                      icon={WalletIcon}
                    />
                  </div>

                  <div>
                    <Label>Cantidad (XLM)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      icon={DollarSign}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                      Balance disponible: {walletBalance.xlm.toFixed(2)} XLM
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Las transacciones en Stellar Network son irreversibles
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading || !sendAmount || !sendAddress}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Fondos
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle>Transacciones Recientes</CardTitle>
                  <Button variant="ghost" size="sm">
                    Ver Todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'receive'
                            ? 'bg-green-100 dark:bg-green-900/20'
                            : 'bg-blue-100 dark:bg-blue-900/20'
                        }`}>
                          {tx.type === 'receive' ? (
                            <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">
                              {tx.type === 'receive' ? 'Recibido' : 'Enviado'}
                            </p>
                            <Badge variant={tx.status === 'completed' ? 'success' : 'outline'} className="text-xs">
                              {tx.status === 'completed' ? 'Completado' : 'Pendiente'}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {tx.type === 'receive' ? 'De' : 'Para'}: {truncateAddress(tx.from || tx.to, 4)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${
                          tx.type === 'receive'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}>
                          {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.asset}
                        </p>
                        <a
                          href={`https://stellar.expert/explorer/public/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 justify-end"
                        >
                          Ver TX
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Info & Stats */}
          <div className="space-y-6">
            {/* Network Status */}
            <Card className="network-status">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Estado de la Red</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Estado</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Operacional
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Último Ledger</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      #51234567
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Fee Base</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      100 stroops
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      Billetera Segura
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        KYC Verificado
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        2FA Activado
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Respaldo Configurado
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assets Summary */}
            <Card>
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Mis Activos</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">XLM</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Stellar Lumens</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {walletBalance.xlm.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">BLK</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">BLOCKI Token</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {walletBalance.blocki}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
