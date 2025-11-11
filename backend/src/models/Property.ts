import mongoose, { Schema, Document } from 'mongoose'

export interface IProperty extends Document {
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
  createdAt: Date
  updatedAt: Date
}

const PropertySchema = new Schema<IProperty>(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    squareFootage: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['available', 'pending', 'sold'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IProperty>('Property', PropertySchema)

