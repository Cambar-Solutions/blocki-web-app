import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Button } from '../ui/Button'
import {
  Building2,
  LogOut,
  Home,
  Wallet,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  LayoutDashboard,
  Plus,
  HelpCircle,
  User,
  Shield,
} from 'lucide-react'
import { useState } from 'react'
import { useTour } from '../../hooks/useTour'

export function Layout({ children, onLearnMoreClick, isLearnMoreActive = false }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { homeTour, dashboardTour, walletTour, zkKYCTour } = useTour()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleTourClick = () => {
    const path = location.pathname
    if (path === '/home') {
      homeTour()
    } else if (path === '/dashboard') {
      dashboardTour()
    } else if (path === '/wallet') {
      walletTour()
    } else if (path === '/profile') {
      zkKYCTour()
    } else {
      homeTour()
    }
  }

  const navigation = [
    { name: 'Inicio', href: '/home', icon: Home, state: { showInfo: false } },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Billetera', href: '/wallet', icon: Wallet },
  ]

  const isActive = (path) => {
    // Si estamos en /home y "Saber más" está activo, "Inicio" no debe estar activo
    if (path === '/home' && isLearnMoreActive) {
      return false
    }
    return location.pathname === path
  }

  const handleLearnMore = () => {
    if (location.pathname === '/home' && onLearnMoreClick) {
      onLearnMoreClick()
    } else {
      navigate('/home', { state: { showInfo: true } })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 cursor-default">
      {/* Header */}
      <header className="sticky top-2 sm:top-4 z-40 mx-2 sm:mx-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/home" state={{ showInfo: false }} className="flex items-center gap-3 group select-none">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Blocki
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Real Estate Tokenization</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    state={item.state}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all select-none ${
                      isActive(item.href)
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
              <button
                onClick={handleLearnMore}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all select-none ${
                  isLearnMoreActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                Saber más
              </button>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Publish Button - Desktop */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/publish')}
                className="publish-button hidden md:flex select-none"
              >
                <Plus className="w-4 h-4" />
                Publicar
              </Button>

              {/* Tour Button */}
              {/* <button
                onClick={handleTourClick}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-105 transition-transform hidden md:flex"
                aria-label="Iniciar tour"
                title="Tour guiado"
              >
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button> */}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-105 transition-transform select-none"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              {/* User Menu - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right select-none">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <Link to="/profile">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="dark:hover:bg-gray-700 select-none">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white select-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-b-2xl">
            <div className="px-4 py-3 space-y-1">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-3 select-none">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    state={item.state}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all select-none ${
                      isActive(item.href)
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}

              {/* Learn More Button */}
              <button
                onClick={() => {
                  handleLearnMore()
                  setMobileMenuOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all select-none ${
                  isLearnMoreActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                Saber más
              </button>

              {/* Profile Link */}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all select-none ${
                  isActive('/profile')
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <User className="w-5 h-5" />
                Mi Perfil
                <Shield className="w-4 h-4 ml-auto text-purple-500" />
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 select-none"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mt-2 sm:mt-4">{children}</main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Stellar Blockchain</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Blocki. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
