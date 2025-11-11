import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { propertiesApi } from '../../services/api'
import type { Property } from '../../types'

const PropertiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    squareFootage: 0,
    description: '',
    status: 'available' as Property['status'],
  })

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => propertiesApi.getAll().then(res => res.data),
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => propertiesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      setIsModalOpen(false)
      resetForm()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => propertiesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      setIsModalOpen(false)
      setEditingProperty(null)
      resetForm()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => propertiesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
    },
  })

  const resetForm = () => {
    setFormData({
      address: '',
      city: '',
      state: '',
      zipCode: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      squareFootage: 0,
      description: '',
      status: 'available',
    })
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setFormData({
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFootage: property.squareFootage,
      description: property.description || '',
      status: property.status,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProperty) {
      updateMutation.mutate({ id: editingProperty._id!, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const properties = data?.properties || []

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Properties</h1>
        <button
          onClick={() => {
            setEditingProperty(null)
            resetForm()
            setIsModalOpen(true)
          }}
          className="btn-primary"
        >
          + Add Property
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: Property) => (
            <div key={property._id} className="card">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{property.address}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {property.city}, {property.state} {property.zipCode}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${property.price.toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span>🛏️ {property.bedrooms} beds</span>
                <span>🚿 {property.bathrooms} baths</span>
                <span>📐 {property.squareFootage.toLocaleString()} sqft</span>
              </div>
              <div className="mb-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  property.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  property.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {property.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(property)}
                  className="flex-1 btn-secondary text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(property._id!)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {editingProperty ? 'Edit Property' : 'Add New Property'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="input-field"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    className="input-field"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Property['status'] })}
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="input-field"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    className="input-field"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Square Footage
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="input-field"
                    value={formData.squareFootage}
                    onChange={(e) => setFormData({ ...formData, squareFootage: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="input-field"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingProperty(null)
                    resetForm()
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingProperty ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertiesPage

