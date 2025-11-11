import mongoose, { Schema, Document } from 'mongoose'

export interface ILead extends Document {
  name: string
  phone: string
  email: string
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  propertyInterest?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted'],
      default: 'new',
    },
    propertyInterest: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ILead>('Lead', LeadSchema)

