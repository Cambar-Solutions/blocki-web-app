import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
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
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-green-500/30 to-emerald-500/30 dark:from-green-500/20 dark:to-emerald-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/20 to-orange-500/20 dark:from-pink-500/10 dark:to-orange-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        {/* Waves decoration */}
        <svg className="absolute bottom-0 left-0 w-full h-64 opacity-20 dark:opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="url(#gradient1)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute top-0 right-0 w-96 h-96 opacity-10 dark:opacity-5" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="url(#gradient2)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="url(#gradient2)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="url(#gradient2)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8 animate-slideUp">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6 shadow-2xl shadow-blue-500/50 dark:shadow-blue-500/30">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Blocki
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Invierte en Real Estate Tokenizado
            </p>
          </div>

          {/* Login Card */}
          <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/20 dark:border-gray-700/50 animate-fadeIn">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Bienvenido de nuevo
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ingresa tus credenciales para continuar
              </p>
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
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            Powered by Stellar Blockchain
          </p>
        </div>
      </div>
    </div>
  )
}
