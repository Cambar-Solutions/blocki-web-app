import { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { getUserPortfolio } from '../data/mockPortfolio'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Home,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Shield,
  Eye,
  Download,
  Plus,
  Building2,
  MapPin,
} from 'lucide-react'
import { formatCurrency, formatPercentage, truncateAddress, formatDate } from '../lib/utils'

export function Dashboard() {
  const navigate = useNavigate()
  const portfolio = getUserPortfolio()
  const [selectedPeriod, setSelectedPeriod] = useState('6M')

  const periods = ['1M', '3M', '6M', '1Y', 'ALL']

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Mi Portafolio
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Bienvenido de nuevo, {portfolio.user.name}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/home')}>
                <Plus className="w-4 h-4" />
                Invertir Más
              </Button>
              <Button variant="ghost">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Invested */}
          <Card className="animate-fadeIn">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <Badge variant="outline" className="text-xs">Total</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Invertido</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolio.summary.totalInvested)}
              </p>
            </CardContent>
          </Card>

          {/* Current Value */}
          <Card className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <Badge variant="success" className="text-xs">
                  +{formatPercentage(portfolio.summary.gainPercentage)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor Actual</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolio.summary.currentValue)}
              </p>
            </CardContent>
          </Card>

          {/* Total Gain */}
          <Card className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="font-semibold">+{formatPercentage(portfolio.summary.gainPercentage)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ganancia Total</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                +{formatCurrency(portfolio.summary.totalGain)}
              </p>
            </CardContent>
          </Card>

          {/* Monthly Income */}
          <Card className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <Badge variant="outline" className="text-xs">Mensual</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ingreso Estimado</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolio.summary.monthlyIncome)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Investments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Summary */}
            <Card className="investment-list">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle>Mis Inversiones</CardTitle>
                  <div className="flex gap-2">
                    {periods.map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          selectedPeriod === period
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {portfolio.investments.map((investment) => (
                    <div
                      key={investment.id}
                      className="group p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                      onClick={() => navigate(`/property/${investment.propertyId}`)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <img
                              src={investment.propertyImage}
                              alt={investment.propertyTitle}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {investment.propertyTitle}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{investment.city}</span>
                                <span>•</span>
                                <span>{investment.tokensOwned} tokens</span>
                              </div>
                            </div>
                            <Badge
                              variant={investment.gain >= 0 ? 'success' : 'destructive'}
                              className="ml-2"
                            >
                              {investment.gain >= 0 ? '+' : ''}
                              {formatPercentage(investment.gainPercentage)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-3">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Invertido</p>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(investment.purchasePrice)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Valor Actual</p>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(investment.currentValue)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ganancia</p>
                              <p className={`text-sm font-semibold ${
                                investment.gain >= 0
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-red-600 dark:text-red-400'
                              }`}>
                                {investment.gain >= 0 ? '+' : ''}{formatCurrency(investment.gain)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {portfolio.investments.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No tienes inversiones aún
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Comienza a invertir en propiedades tokenizadas
                    </p>
                    <Button onClick={() => navigate('/home')}>
                      Explorar Propiedades
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="transactions-section">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Transacciones Recientes</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {portfolio.transactions.slice(0, 5).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'PURCHASE'
                            ? 'bg-blue-100 dark:bg-blue-900/20'
                            : 'bg-green-100 dark:bg-green-900/20'
                        }`}>
                          {tx.type === 'PURCHASE' ? (
                            <ArrowUpRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">
                            {tx.type === 'PURCHASE' ? 'Compra' : 'Dividendo'}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {tx.propertyTitle}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-sm ${
                          tx.type === 'PURCHASE'
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {tx.type === 'PURCHASE' ? '-' : '+'}{formatCurrency(tx.amount)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(tx.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Wallet Info */}
            <Card className="wallet-info">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Mi Billetera</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Dirección</p>
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {truncateAddress(portfolio.user.walletAddress, 6)}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                        KYC Verificado
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-500">
                        Tu cuenta está completamente verificada
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      Miembro desde {formatDate(portfolio.user.memberSince)}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver en Stellar Expert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Stats */}
            <Card>
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Propiedades</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {portfolio.summary.totalProperties}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Tokens</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {portfolio.summary.totalTokens}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">ROI Promedio</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatPercentage(portfolio.summary.gainPercentage)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0">
              <CardContent className="p-6 text-white">
                <Building2 className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-2">
                  Diversifica tu portafolio
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Descubre nuevas oportunidades de inversión en el mercado inmobiliario
                </p>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/home')}
                >
                  Explorar Propiedades
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
