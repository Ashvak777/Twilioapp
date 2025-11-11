import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Leads API
export const leadsApi = {
  getAll: () => api.get('/leads'),
  getById: (id: string) => api.get(`/leads/${id}`),
  create: (data: any) => api.post('/leads', data),
  update: (id: string, data: any) => api.put(`/leads/${id}`, data),
  delete: (id: string) => api.delete(`/leads/${id}`),
}

// Properties API
export const propertiesApi = {
  getAll: () => api.get('/properties'),
  getById: (id: string) => api.get(`/properties/${id}`),
  create: (data: any) => api.post('/properties', data),
  update: (id: string, data: any) => api.put(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`),
}

// Communications API
export const communicationsApi = {
  getAll: () => api.get('/communications'),
  getMessages: (leadId: string) => api.get(`/communications/${leadId}/messages`),
  sendMessage: (leadId: string, body: string) => api.post(`/communications/${leadId}/send`, { body }),
  getConversation: (phoneNumber: string) => api.get(`/communications/conversation/${phoneNumber}`),
}

export default api

