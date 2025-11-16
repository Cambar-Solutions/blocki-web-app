import api from './api'

export const propertyService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    const response = await api.get(`/properties?${params.toString()}`)
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/properties/${id}`)
    return response.data
  },

  create: async (propertyData) => {
    const response = await api.post('/properties', propertyData)
    return response.data
  },

  update: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/properties/${id}`)
    return response.data
  },

  uploadImages: async (id, images) => {
    const formData = new FormData()
    images.forEach((image) => {
      formData.append('images', image)
    })
    const response = await api.post(`/properties/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  uploadDocuments: async (id, documents) => {
    const formData = new FormData()
    documents.forEach((doc) => {
      formData.append('documents', doc)
    })
    const response = await api.post(`/properties/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}
