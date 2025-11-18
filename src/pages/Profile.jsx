import { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ZKKYCVerification } from '../components/kyc/ZKKYCVerification'
import { useAuth } from '../contexts/AuthContext'
import { useWallet } from '../contexts/WalletContext'
import {
  User,
  Shield,
  Wallet,
  Mail,
  MapPin,
  Calendar,
  Edit,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import { formatDate } from '../lib/utils'

/**
 * Página de Perfil de Usuario
 * Incluye información personal, estado de verificación KYC, y verificación ZK-KYC
 */
export function Profile() {
  const { user } = useAuth()
  const { address } = useWallet()
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Mock user data - en producción vendría del backend
  const userData = {
    name: user?.email?.split('@')[0] || 'Usuario',
    email: user?.email || 'usuario@example.com',
    country: 'Argentina',
    city: 'Buenos Aires',
    joinedDate: '2024-01-15',
    kycStatus: 'pending', // 'pending', 'approved', 'rejected', 'not_started'
    isZKVerified: false,
  }

  const getKYCStatusBadge = () => {
    switch (userData.kycStatus) {
      case 'approved':
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Verificado
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Pendiente
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rechazado
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            No Iniciado
          </Badge>
        )
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mi Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra tu información personal y verificación de identidad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Información Personal
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">Nombre</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {userData.name}
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-500 dark:text-gray-400 mb-1">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-500 dark:text-gray-400 mb-1">Ubicación</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {userData.city}, {userData.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-500 dark:text-gray-400 mb-1">Miembro desde</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(userData.joinedDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Info */}
            {address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Wallet Conectada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Dirección Pública
                    </p>
                    <p className="text-sm font-mono break-all text-gray-900 dark:text-white">
                      {address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* KYC Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Estado de Verificación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    KYC Tradicional
                  </span>
                  {getKYCStatusBadge()}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Zero-Knowledge KYC
                  </span>
                  {userData.isZKVerified ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verificado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Pendiente
                    </Badge>
                  )}
                </div>

                {!userData.isZKVerified && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t">
                    Complete la verificación ZK-KYC abajo para obtener acceso completo a la plataforma
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - ZK-KYC Verification */}
          <div className="lg:col-span-2">
            <ZKKYCVerification userPublicKey={address} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
