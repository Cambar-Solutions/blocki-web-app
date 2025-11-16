import { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Label, Textarea } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import {
  Home,
  MapPin,
  DollarSign,
  Maximize2,
  Upload,
  CheckCircle,
  AlertCircle,
  Building2,
  FileText,
  Shield,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function PublishProperty() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Información Básica
    title: '',
    type: 'RESIDENTIAL',
    address: '',
    city: '',
    country: 'México',

    // Detalles de la Propiedad
    description: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    amenities: [],

    // Información Financiera
    valuation: '',
    totalTokens: '',
    tokenPrice: '',
    expectedROI: '',

    // Documentos
    images: [],
    documents: [],
  })

  const propertyTypes = [
    { value: 'RESIDENTIAL', label: 'Residencial' },
    { value: 'COMMERCIAL', label: 'Comercial' },
    { value: 'LAND', label: 'Terreno' },
    { value: 'INDUSTRIAL', label: 'Industrial' },
  ]

  const cities = [
    'Ciudad de México',
    'Guadalajara',
    'Monterrey',
    'Querétaro',
    'Acapulco',
    'Cancún',
    'Puebla',
    'Tijuana',
  ]

  const commonAmenities = [
    'Estacionamiento',
    'Jardín',
    'Alberca',
    'Gimnasio',
    'Seguridad 24/7',
    'Cocina integral',
    'Balcón',
    'Terraza',
    'Elevador',
    'Bodega',
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('¡Propiedad publicada exitosamente! Está en revisión.')
      navigate('/dashboard')
    }, 2000)
  }

  const steps = [
    { number: 1, title: 'Información Básica', icon: Home },
    { number: 2, title: 'Detalles', icon: Building2 },
    { number: 3, title: 'Financiero', icon: DollarSign },
    { number: 4, title: 'Documentos', icon: FileText },
  ]

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Publicar Propiedad
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tokeniza tu propiedad y accede a un nuevo mercado de inversores
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-600 dark:bg-green-500'
                        : isActive
                        ? 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                      )}
                    </div>
                    <p className={`mt-2 text-sm font-medium ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 rounded ${
                      isCompleted
                        ? 'bg-green-600 dark:bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="p-8">
            {/* Step 1: Información Básica */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Información Básica de la Propiedad
                  </h3>
                </div>

                <div>
                  <Label required>Título de la Propiedad</Label>
                  <Input
                    type="text"
                    placeholder="Ej: Casa Moderna en Polanco"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    icon={Home}
                  />
                </div>

                <div>
                  <Label required>Tipo de Propiedad</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleInputChange('type', type.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.type === type.value
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {type.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label required>Ciudad</Label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona una ciudad</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label required>País</Label>
                    <Input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      icon={MapPin}
                    />
                  </div>
                </div>

                <div>
                  <Label required>Dirección Completa</Label>
                  <Input
                    type="text"
                    placeholder="Calle, número, colonia, CP"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    icon={MapPin}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Detalles */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Detalles de la Propiedad
                  </h3>
                </div>

                <div>
                  <Label required>Descripción</Label>
                  <Textarea
                    placeholder="Describe tu propiedad, características destacadas, ubicación, etc."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label required>Área (m²)</Label>
                    <Input
                      type="number"
                      placeholder="250"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      icon={Maximize2}
                    />
                  </div>

                  <div>
                    <Label>Habitaciones</Label>
                    <Input
                      type="number"
                      placeholder="3"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      icon={Home}
                    />
                  </div>

                  <div>
                    <Label>Baños</Label>
                    <Input
                      type="number"
                      placeholder="2"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Año Construcción</Label>
                    <Input
                      type="number"
                      placeholder="2020"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Amenidades</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonAmenities.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`p-3 rounded-lg border transition-all text-sm ${
                          formData.amenities.includes(amenity)
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Financiero */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Información Financiera
                  </h3>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Información Importante
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Estos valores serán verificados por nuestro equipo de valuación. El proceso puede tomar de 3-5 días hábiles.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label required>Valuación Total (MXN)</Label>
                  <Input
                    type="number"
                    placeholder="2500000"
                    value={formData.valuation}
                    onChange={(e) => handleInputChange('valuation', e.target.value)}
                    icon={DollarSign}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                    Valor de avalúo actualizado de la propiedad
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label required>Total de Tokens a Emitir</Label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={formData.totalTokens}
                      onChange={(e) => handleInputChange('totalTokens', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                      Cantidad de tokens que representarán la propiedad
                    </p>
                  </div>

                  <div>
                    <Label required>Precio por Token (MXN)</Label>
                    <Input
                      type="number"
                      placeholder="2500"
                      value={formData.tokenPrice}
                      onChange={(e) => handleInputChange('tokenPrice', e.target.value)}
                      icon={DollarSign}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                      Generalmente: Valuación ÷ Total Tokens
                    </p>
                  </div>
                </div>

                <div>
                  <Label required>ROI Esperado Anual (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="8.5"
                    value={formData.expectedROI}
                    onChange={(e) => handleInputChange('expectedROI', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                    Retorno de inversión anual estimado
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Documentos */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Documentos y Fotos
                  </h3>
                </div>

                <div>
                  <Label required>Fotos de la Propiedad</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Haz clic para subir fotos
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG hasta 10MB (mínimo 3 fotos)
                    </p>
                  </div>
                </div>

                <div>
                  <Label required>Documentos Legales</Label>
                  <div className="space-y-3">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Escritura Pública
                          </span>
                        </div>
                        <Badge variant="outline">Requerido</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="w-4 h-4" />
                        Subir Documento
                      </Button>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Avalúo Actualizado
                          </span>
                        </div>
                        <Badge variant="outline">Requerido</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="w-4 h-4" />
                        Subir Documento
                      </Button>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Certificado de Libertad de Gravamen
                          </span>
                        </div>
                        <Badge variant="outline">Requerido</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="w-4 h-4" />
                        Subir Documento
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                        Proceso de Verificación
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Una vez enviada la solicitud, nuestro equipo legal verificará todos los documentos.
                        Te contactaremos en un plazo de 3-5 días hábiles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Publicando...' : 'Publicar Propiedad'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
