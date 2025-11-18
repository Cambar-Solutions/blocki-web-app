import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Filter, X } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { PropertyCard } from '../components/property/PropertyCard'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { HowItWorksModal } from '../components/HowItWorks'
import { LearnMore } from '../components/LearnMore'
import { mockProperties, filterProperties } from '../data/mockProperties'

// Constantes de filtros
const CITIES = ['Buenos Aires', 'São Paulo', 'Río de Janeiro', 'Santiago', 'Medellín', 'Lima']
const PROPERTY_TYPES = [
  { value: 'RESIDENTIAL', label: 'Residencial' },
  { value: 'COMMERCIAL', label: 'Comercial' },
  { value: 'LAND', label: 'Terreno' },
]

export function Home() {
  const location = useLocation()

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Estados para modales y vistas
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  // Sincronizar con navegación desde otras páginas
  useEffect(() => {
    if (location.state?.showInfo !== undefined) {
      setShowInfo(location.state.showInfo)
    }
  }, [location.state])

  // Lógica de filtrado
  const filteredProperties = filterProperties({
    search: searchTerm,
    type: selectedType,
    city: selectedCity,
  })

  const hasActiveFilters = searchTerm || selectedType || selectedCity

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setSelectedCity('')
  }

  const handleLearnMoreClick = () => setShowInfo(!showInfo)

  return (
    <>
      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />

      <Layout onLearnMoreClick={handleLearnMoreClick} isLearnMoreActive={showInfo}>
        {showInfo ? (
          <LearnMore
            onExploreClick={() => setShowInfo(false)}
            onHowItWorksClick={() => setShowHowItWorks(true)}
          />
        ) : (
          <>
            {/* Search & Filters Section */}
            <div className="sticky top-20 sm:top-24 z-30 mx-2 sm:mx-4 mb-4">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg cursor-default">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Buscar por ciudad, dirección o tipo..."
                      icon={Search}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Button
                    variant={showFilters ? 'primary' : 'outline'}
                    onClick={() => setShowFilters(!showFilters)}
                    className="sm:w-auto"
                  >
                    <Filter className="w-4 h-4" />
                    Filtros
                    {hasActiveFilters && (
                      <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    )}
                  </Button>

                  {hasActiveFilters && (
                    <Button variant="ghost" onClick={clearFilters} className="sm:w-auto">
                      <X className="w-4 h-4" />
                      Limpiar
                    </Button>
                  )}
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Ciudad
                        </label>
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Todas las ciudades</option>
                          {CITIES.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tipo de Propiedad
                        </label>
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Todos los tipos</option>
                          {PROPERTY_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Properties Grid */}
            <div id="properties-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 cursor-default">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Propiedades Disponibles
                  <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({filteredProperties.length} resultados)
                  </span>
                </h2>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No se encontraron propiedades
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Intenta ajustar tus filtros de búsqueda
                  </p>
                  <Button onClick={clearFilters}>Limpiar filtros</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property, index) => (
                    <PropertyCard key={property.id} property={property} className={index === 0 ? 'property-card' : ''} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </Layout>
    </>
  )
}
