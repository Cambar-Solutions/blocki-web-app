import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { Card, CardContent } from '../components/ui/Card'
import {
  Mail,
  Lock,
  Building2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Moon,
  Sun,
  Shield,
  TrendingUp,
  Wallet,
  Globe,
  Zap,
  Users,
} from 'lucide-react'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({})

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'El correo electrónico es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Por favor ingresa un correo electrónico válido'
        } else {
          delete newErrors.email
        }
        break
      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida'
        } else if (value.length < 8) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
        } else {
          delete newErrors.password
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
    validateField(field, formData[field])
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    if (touched[field]) {
      validateField(field, value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailValid = validateField('email', formData.email)
    const passwordValid = validateField('password', formData.password)

    if (!emailValid || !passwordValid) {
      setTouched({ email: true, password: true })
      return
    }

    setLoading(true)
    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate('/home')
    } else {
      setErrors({
        submit: result.error || 'Error al iniciar sesión.',
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="text-white space-y-8 hidden md:block">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold">Powered by Stellar Blockchain</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Democratizamos el Real Estate en Latinoamérica
            </h1>

            <p className="text-xl text-blue-100">
              Invierte en propiedades tokenizadas desde $2,500 MXN con la seguridad y transparencia de blockchain
            </p>
          </div>

          <div className="space-y-4">
            <FeatureItem
              icon={<Wallet className="w-6 h-6" />}
              title="Inversión Accesible"
              description="Accede al mercado inmobiliario con montos desde $2,500 MXN"
            />
            <FeatureItem
              icon={<Shield className="w-6 h-6" />}
              title="Seguridad Blockchain"
              description="Todas las transacciones verificadas en Stellar Network"
            />
            <FeatureItem
              icon={<TrendingUp className="w-6 h-6" />}
              title="Retornos Verificables"
              description="Seguimiento en tiempo real de tu portafolio de inversiones"
            />
            <FeatureItem
              icon={<Globe className="w-6 h-6" />}
              title="Mercado LATAM"
              description="Propiedades verificadas en toda Latinoamérica"
            />
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido a Blocki</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Inicia sesión en tu cuenta</p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label required>Email</Label>
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label required>Contraseña</Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        Ocultar
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        Mostrar
                      </>
                    )}
                  </button>
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  error={touched.password && errors.password}
                />
                {touched.password && errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full group"
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Ingresando...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-blue-100 text-sm">{description}</p>
      </div>
    </div>
  )
}
