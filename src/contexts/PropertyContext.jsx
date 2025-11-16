import { createContext, useContext, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { propertyService } from '../services/propertyService'
import toast from 'react-hot-toast'

const PropertyContext = createContext()

export function PropertyProvider({ children }) {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    location: '',
    priceRange: '',
    status: '',
  })

  // Fetch all properties
  const {
    data: properties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyService.getAll(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Fetch single property
  const useProperty = (id) => {
    return useQuery({
      queryKey: ['property', id],
      queryFn: () => propertyService.getById(id),
      enabled: !!id,
    })
  }

  // Create property mutation
  const createPropertyMutation = useMutation({
    mutationFn: propertyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['properties'])
      toast.success('Propiedad creada exitosamente')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error al crear propiedad')
    },
  })

  // Update property mutation
  const updatePropertyMutation = useMutation({
    mutationFn: ({ id, data }) => propertyService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['properties'])
      toast.success('Propiedad actualizada exitosamente')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error al actualizar propiedad')
    },
  })

  const value = {
    properties,
    isLoading,
    error,
    filters,
    setFilters,
    useProperty,
    createProperty: createPropertyMutation.mutate,
    updateProperty: updatePropertyMutation.mutate,
    isCreating: createPropertyMutation.isPending,
    isUpdating: updatePropertyMutation.isPending,
  }

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>
}

export function useProperties() {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error('useProperties must be used within PropertyProvider')
  }
  return context
}
