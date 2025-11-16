import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext()

// MODO DEMO: Cambia a false cuando el backend esté listo
const DEMO_MODE = true

// Usuarios demo para pruebas
const DEMO_USERS = [
  { id: 1, email: 'demo@blocki.com', password: 'demo1234', name: 'Demo User' },
  { id: 2, email: 'investor@blocki.com', password: 'investor123', name: 'María González' },
  { id: 3, email: 'owner@blocki.com', password: 'owner123', name: 'Juan Pérez' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      if (DEMO_MODE) {
        // Modo demo: verificar si hay usuario en localStorage
        const savedUser = localStorage.getItem('blocki_demo_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
        setLoading(false)
        return
      }

      const token = localStorage.getItem('blocki_token')
      if (token) {
        const userData = await authService.validate()
        setUser(userData.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('blocki_token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    if (DEMO_MODE) {
      // Modo demo: verificar credenciales demo
      await new Promise(resolve => setTimeout(resolve, 800)) // Simular latencia

      const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password)

      if (demoUser) {
        const userData = { id: demoUser.id, email: demoUser.email, name: demoUser.name }
        setUser(userData)
        localStorage.setItem('blocki_demo_user', JSON.stringify(userData))
        localStorage.setItem('blocki_token', 'demo-token-' + demoUser.id)
        toast.success(`¡Bienvenido ${demoUser.name}!`, {
          icon: '🎉',
          duration: 4000,
        })
        return { success: true }
      } else {
        toast.error('Credenciales incorrectas. Prueba con: demo@blocki.com / demo1234')
        return { success: false, error: 'Credenciales incorrectas' }
      }
    }

    // Modo real (cuando el backend esté listo)
    try {
      const response = await authService.login({ email, password })
      setUser(response.user)
      localStorage.setItem('blocki_token', response.access_token)
      toast.success(`¡Bienvenido ${response.user.name}!`)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData) => {
    if (DEMO_MODE) {
      // Modo demo: simular registro
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.success('✅ Cuenta creada exitosamente. Usa: demo@blocki.com / demo1234 para entrar', {
        duration: 5000,
      })
      return { success: true, data: userData }
    }

    // Modo real
    try {
      const response = await authService.register(userData)
      toast.success('Cuenta creada exitosamente. Por favor inicia sesión.')
      return { success: true, data: response }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrar usuario'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('blocki_token')
    localStorage.removeItem('blocki_demo_user')
    toast.success('Sesión cerrada correctamente')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
