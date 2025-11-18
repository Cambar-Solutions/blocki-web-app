import { Shield, TrendingUp, Zap } from 'lucide-react'
import { Button } from './ui/Button'
import { mockProperties } from '../data/mockProperties'

export function LearnMore({ onExploreClick, onHowItWorksClick }) {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 cursor-default">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="text-center space-y-16">

          {/* Header Section */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Verificado en Stellar Blockchain</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight px-4">
              Democratizamos el Real Estate
              <br />
              <span className="text-blue-600 dark:text-blue-400">en Latinoamérica</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Invierte desde <span className="font-bold text-blue-600 dark:text-blue-400">$100 USD</span> en propiedades tokenizadas.
              <br />
              Sin intermediarios, con seguridad blockchain y retornos verificables.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={onExploreClick}
              className="px-8"
            >
              <TrendingUp className="w-5 h-5" />
              Explorar Propiedades
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onHowItWorksClick}
              className="px-8"
            >
              <Shield className="w-5 h-5" />
              Cómo Funciona
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto py-6">
            <div className="space-y-3">
              <p className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">{mockProperties.length}</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Propiedades</p>
            </div>
            <div className="space-y-3">
              <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">8.5%</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">ROI Promedio</p>
            </div>
            <div className="space-y-3">
              <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">100%</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Verificadas</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5 mx-auto">
                <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">KYC Verificado</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">Cumplimiento legal con verificación de identidad en toda LATAM</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5 mx-auto">
                <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Stellar Blockchain</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">Transacciones rápidas, seguras y con fees mínimos</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5 mx-auto">
                <TrendingUp className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Inversión Accesible</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">Accede al mercado inmobiliario desde fracciones pequeñas</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
