import { X, Shield, Home, Coins, TrendingUp, Wallet, CheckCircle } from 'lucide-react'
import { Button } from './ui/Button'

export function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const steps = [
    {
      icon: Shield,
      title: '1. Verifica tu Identidad',
      description: 'Completa el proceso KYC para cumplir con regulaciones y asegurar la plataforma.',
      color: 'blue',
    },
    {
      icon: Wallet,
      title: '2. Conecta tu Billetera',
      description: 'Conecta o crea tu billetera de Stellar para realizar transacciones seguras en blockchain.',
      color: 'purple',
    },
    {
      icon: Home,
      title: '3. Explora Propiedades',
      description: 'Navega por nuestro marketplace y encuentra propiedades tokenizadas verificadas en toda LATAM.',
      color: 'green',
    },
    {
      icon: Coins,
      title: '4. Compra Tokens',
      description: 'Invierte desde $100 USD comprando fracciones (tokens) de propiedades inmobiliarias.',
      color: 'orange',
    },
    {
      icon: TrendingUp,
      title: '5. Recibe Dividendos',
      description: 'Obtén retornos mensuales proporcionales a tu participación en cada propiedad.',
      color: 'pink',
    },
    {
      icon: CheckCircle,
      title: '6. Gestiona tu Portafolio',
      description: 'Monitorea el valor de tus inversiones y rendimientos en tiempo real desde tu dashboard.',
      color: 'indigo',
    },
  ]

  const benefits = [
    'Inversión mínima accesible desde $100 USD',
    'Propiedades 100% verificadas y con documentación legal',
    'Transacciones seguras en Stellar Network',
    'ROI promedio del 8-15% anual',
    'Liquidez mejorada vs. inversión tradicional',
    'Diversificación de portafolio inmobiliario',
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-slideUp">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                ¿Cómo Funciona Blocki?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Invierte en Real Estate de forma simple y segura con blockchain
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Proceso Paso a Paso
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={index}
                      className="group relative p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Beneficios de Blocki
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tecnología
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">⭐</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Stellar Network
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Blockchain rápido y eficiente
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Smart Contracts
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Automatización de pagos
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    KYC/AML
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Cumplimiento legal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Listo para empezar a invertir?
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={onClose}>
                Explorar Propiedades
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
