export const mockProperties = [
  {
    id: '1',
    title: 'Casa Moderna en Polanco',
    address: 'Av. Presidente Masaryk 123, Polanco',
    city: 'Ciudad de México',
    country: 'México',
    type: 'RESIDENTIAL',
    valuation: 2500000,
    totalTokens: 1000,
    availableTokens: 650,
    tokenPrice: 2500,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    description: 'Hermosa casa moderna con acabados de lujo en una de las zonas más exclusivas de la Ciudad de México.',
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2020,
    amenities: ['Jardín', 'Estacionamiento', 'Seguridad 24/7', 'Cocina integral'],
    status: 'ACTIVE',
    roi: 8.5,
    tokenizedPercentage: 65,
  },
  {
    id: '2',
    title: 'Departamento Vista Mar',
    address: 'Costera Miguel Alemán 456',
    city: 'Acapulco',
    country: 'México',
    type: 'RESIDENTIAL',
    valuation: 1800000,
    totalTokens: 800,
    availableTokens: 320,
    tokenPrice: 2250,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    ],
    description: 'Departamento de lujo con vista panorámica al mar, en la mejor zona hotelera de Acapulco.',
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2021,
    amenities: ['Alberca', 'Gimnasio', 'Vista al mar', 'Balcón'],
    status: 'ACTIVE',
    roi: 9.2,
    tokenizedPercentage: 40,
  },
  {
    id: '3',
    title: 'Local Comercial Centro',
    address: 'Av. Juárez 789, Centro Histórico',
    city: 'Guadalajara',
    country: 'México',
    type: 'COMMERCIAL',
    valuation: 3200000,
    totalTokens: 1500,
    availableTokens: 300,
    tokenPrice: 2133,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    ],
    description: 'Local comercial estratégicamente ubicado en el corazón del Centro Histórico de Guadalajara.',
    area: 320,
    bedrooms: 0,
    bathrooms: 2,
    yearBuilt: 2018,
    amenities: ['Estacionamiento', 'Seguridad', 'Acceso vehicular'],
    status: 'ACTIVE',
    roi: 10.5,
    tokenizedPercentage: 80,
  },
  {
    id: '4',
    title: 'Casa Residencial San Pedro',
    address: 'Calzada del Valle 234',
    city: 'Monterrey',
    country: 'México',
    type: 'RESIDENTIAL',
    valuation: 4100000,
    totalTokens: 2000,
    availableTokens: 1400,
    tokenPrice: 2050,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
    ],
    description: 'Residencia de alto nivel en San Pedro Garza García, la zona más exclusiva de Monterrey.',
    area: 380,
    bedrooms: 5,
    bathrooms: 4,
    yearBuilt: 2019,
    amenities: ['Piscina', 'Jardín amplio', 'Estudio', 'Bodega'],
    status: 'ACTIVE',
    roi: 7.8,
    tokenizedPercentage: 30,
  },
  {
    id: '5',
    title: 'Terreno Industrial',
    address: 'Parque Industrial Norte',
    city: 'Querétaro',
    country: 'México',
    type: 'LAND',
    valuation: 5500000,
    totalTokens: 2500,
    availableTokens: 500,
    tokenPrice: 2200,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    ],
    description: 'Terreno industrial con excelente ubicación y acceso a vías principales.',
    area: 5000,
    bedrooms: 0,
    bathrooms: 0,
    yearBuilt: null,
    amenities: ['Servicios completos', 'Acceso carretero', 'Seguridad'],
    status: 'ACTIVE',
    roi: 11.0,
    tokenizedPercentage: 80,
  },
  {
    id: '6',
    title: 'Penthouse Luxury',
    address: 'Av. Insurgentes Sur 1000',
    city: 'Ciudad de México',
    country: 'México',
    type: 'RESIDENTIAL',
    valuation: 6800000,
    totalTokens: 3000,
    availableTokens: 1800,
    tokenPrice: 2266,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    description: 'Penthouse exclusivo con terraza privada y vistas panorámicas de la ciudad.',
    area: 450,
    bedrooms: 4,
    bathrooms: 4,
    yearBuilt: 2022,
    amenities: ['Terraza', 'Jacuzzi', 'Smart Home', 'Elevador privado'],
    status: 'ACTIVE',
    roi: 6.5,
    tokenizedPercentage: 40,
  },
]

export const getPropertyById = (id) => {
  return mockProperties.find(p => p.id === id)
}

export const filterProperties = (filters) => {
  let filtered = [...mockProperties]

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.city.toLowerCase().includes(search) ||
      p.address.toLowerCase().includes(search)
    )
  }

  if (filters.type) {
    filtered = filtered.filter(p => p.type === filters.type)
  }

  if (filters.city) {
    filtered = filtered.filter(p => p.city === filters.city)
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(Number)
    filtered = filtered.filter(p => p.valuation >= min && p.valuation <= max)
  }

  return filtered
}
