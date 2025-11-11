export interface Lead {
  _id?: string
  name: string
  phone: string
  email: string
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  propertyInterest?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface Property {
  _id?: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFootage: number
  description?: string
  images?: string[]
  status: 'available' | 'pending' | 'sold'
  createdAt?: string
  updatedAt?: string
}

export interface Message {
  _id?: string
  leadId: string
  phoneNumber: string
  direction: 'inbound' | 'outbound'
  body: string
  status: 'sent' | 'delivered' | 'failed' | 'received'
  createdAt?: string
}

export interface Communication {
  _id?: string
  leadId: string
  leadName: string
  phoneNumber: string
  lastMessage?: string
  lastMessageTime?: string
  messageCount: number
  unreadCount: number
}

