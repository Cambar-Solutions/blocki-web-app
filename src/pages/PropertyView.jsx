import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card, CardContent } from '../components/ui/Card'
import { Input, Label } from '../components/ui/Input'
import { getPropertyById } from '../data/mockProperties'
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  Home,
  Bath,
  TrendingUp,
  Shield,
  Calendar,
  Wallet,
  Check,
} from 'lucide-react'
import toast from 'react-hot-toast'

export function PropertyView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const property = getPropertyById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [tokenAmount, setTokenAmount] = useState(1)

  if (!property) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Propiedad no encontrada
          </h2>
          <Button onClick={() => navigate('/home')}>Volver al inicio</Button>
        </div>
      </Layout>
    )
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const totalCost = tokenAmount * property.tokenPrice
  const fee = totalCost * 0.02
  const finalTotal = totalCost + fee

  const handlePurchase = () => {
    toast.success(
      `¡Compra simulada exitosa! ${tokenAmount} tokens de ${property.title}`,
      { icon: '🎉', duration: 4000 }
    )
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al marketplace
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <img
                  src={property.images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="default" className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                    {property.type === 'RESIDENTIAL' ? 'Residencial' : property.type === 'COMMERCIAL' ? 'Comercial' : 'Terreno'}
                  </Badge>
                </div>
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-blue-600 dark:border-blue-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                  <MapPin className="w-5 h-5" />
                  <span>{property.address}, {property.city}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <Maximize2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Área</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{property.area}m²</p>
                  </div>
                  {property.bedrooms > 0 && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Home className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Habitaciones</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{property.bedrooms}</p>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <Bath className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Baños</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{property.bathrooms}</p>
                    </div>
                  )}
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-green-700 dark:text-green-400">ROI Anual</p>
                    <p className="text-lg font-bold text-green-700 dark:text-green-400">{property.roi}%</p>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700 my-6" />

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Descripción
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Amenidades */}
                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Amenidades
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Purchase Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor Total</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(property.valuation)}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Total Tokens</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{property.totalTokens}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Disponibles</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{property.availableTokens}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Precio/Token</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(property.tokenPrice)}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <span>Progreso</span>
                      <span>{property.tokenizedPercentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        style={{ width: `${property.tokenizedPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700 mb-6" />

                  {/* Purchase Form */}
                  <div className="space-y-4">
                    <div>
                      <Label>Cantidad de Tokens</Label>
                      <Input
                        type="number"
                        min="1"
                        max={property.availableTokens}
                        value={tokenAmount}
                        onChange={(e) => setTokenAmount(Math.max(1, Math.min(property.availableTokens, parseInt(e.target.value) || 1)))}
                        className="text-center text-lg font-bold"
                      />
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(totalCost)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Fee (2%)</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(fee)}</span>
                      </div>
                      <hr className="border-gray-200 dark:border-gray-600" />
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handlePurchase}
                    >
                      <Wallet className="w-5 h-5" />
                      Comprar Tokens
                    </Button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Transacción segura en Stellar
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Información Legal
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">Escritura Verificada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">Avalúo Actualizado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">Sin Gravámenes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
