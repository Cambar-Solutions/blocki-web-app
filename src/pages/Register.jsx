import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { Input, Label } from '../components/ui/Input'
import { Card, CardContent } from '../components/ui/Card'
import {
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Building2,
  ShieldCheck,
} from 'lucide-react'

export function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [touched, setTouched] = useState({})

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!value) {
          newErrors.name = 'El nombre completo es requerido'
        } else if (value.length < 3) {
          newErrors.name = 'El nombre debe tener al menos 3 caracteres'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        if (!value) {
          newErrors.email = 'El correo electrónico es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Por favor ingresa un correo electrónico válido'
        } else {
          delete newErrors.email
        }
        break
      case 'phone':
        if (!value) {
          newErrors.phone = 'El teléfono es requerido'
        } else if (!/^\+?[\d\s-()]{10,}$/.test(value)) {
          newErrors.phone = 'Por favor ingresa un teléfono válido'
        } else {
          delete newErrors.phone
        }
        break
      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida'
        } else if (value.length < 8) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = 'Debe incluir al menos una letra mayúscula'
        } else if (!/\d/.test(value)) {
          newErrors.password = 'Debe incluir al menos un número'
        } else {
          delete newErrors.password
        }
        break
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Por favor confirma tu contraseña'
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden'
        } else {
          delete newErrors.confirmPassword
        }
        break
      case 'acceptTerms':
        if (!value) {
          newErrors.acceptTerms = 'Debes aceptar los términos y condiciones'
        } else {
          delete newErrors.acceptTerms
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
    // Also validate confirmPassword when password changes
    if (field === 'password' && touched.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const nameValid = validateField('name', formData.name)
    const emailValid = validateField('email', formData.email)
    const phoneValid = validateField('phone', formData.phone)
    const passwordValid = validateField('password', formData.password)
    const confirmPasswordValid = validateField('confirmPassword', formData.confirmPassword)
    const termsValid = validateField('acceptTerms', formData.acceptTerms)

    if (!nameValid || !emailValid || !phoneValid || !passwordValid || !confirmPasswordValid || !termsValid) {
      setTouched({
        name: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
        acceptTerms: true,
      })
      return
    }

    setLoading(true)

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    })

    if (result.success) {
      navigate('/login')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700 flex items-center justify-center p-4 py-12">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-9 h-9 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Únete a Blocki</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Crea tu cuenta y comienza a invertir en propiedades
              </p>
              <div className="inline-flex items-center gap-2 mt-4 glass px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">100% Seguro y Verificado</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label required>Nombre completo</Label>
                <Input
                  type="text"
                  placeholder="Juan Pérez García"
                  icon={User}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  error={touched.name && errors.name}
                />
                {touched.name && errors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label required>Correo electrónico</Label>
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  autoComplete="email"
                  error={touched.email && errors.email}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label required>Teléfono</Label>
                <Input
                  type="tel"
                  placeholder="+52 555 123 4567"
                  icon={Phone}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  autoComplete="tel"
                  error={touched.phone && errors.phone}
                />
                {touched.phone && errors.phone && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
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
                  placeholder="Mínimo 8 caracteres"
                  icon={Lock}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  autoComplete="new-password"
                  error={touched.password && errors.password}
                />

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            level <= passwordStrength
                              ? passwordStrength === 1
                                ? 'bg-red-500'
                                : passwordStrength === 2
                                ? 'bg-orange-500'
                                : passwordStrength === 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {passwordStrength === 0 && 'Muy débil'}
                      {passwordStrength === 1 && 'Débil'}
                      {passwordStrength === 2 && 'Media'}
                      {passwordStrength === 3 && 'Fuerte'}
                      {passwordStrength === 4 && 'Muy fuerte'}
                    </p>
                  </div>
                )}

                {/* Password requirements */}
                <div className="mt-2 space-y-1">
                  <PasswordRequirement met={formData.password.length >= 8} text="Mínimo 8 caracteres" />
                  <PasswordRequirement met={/[A-Z]/.test(formData.password)} text="Una letra mayúscula" />
                  <PasswordRequirement met={/\d/.test(formData.password)} text="Un número" />
                </div>

                {touched.password && errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label required>Confirmar contraseña</Label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    {showConfirmPassword ? (
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repite tu contraseña"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  autoComplete="new-password"
                  error={touched.confirmPassword && errors.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword && formData.confirmPassword === formData.password && (
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mt-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Las contraseñas coinciden
                  </p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                    onBlur={() => handleBlur('acceptTerms')}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Acepto los{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                      Términos y Condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                      Política de Privacidad
                    </a>
                  </span>
                </label>
                {touched.acceptTerms && errors.acceptTerms && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-6"
                disabled={loading || Object.keys(errors).length > 0 || !formData.acceptTerms}
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
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ¿Ya tienes cuenta?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PasswordRequirement({ met, text }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
      )}
      <span className={`text-xs ${met ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
        {text}
      </span>
    </div>
  )
}
