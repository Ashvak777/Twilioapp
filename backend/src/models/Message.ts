import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  leadId: mongoose.Types.ObjectId
  phoneNumber: string
  direction: 'inbound' | 'outbound'
  body: string
  status: 'sent' | 'delivered' | 'failed' | 'received'
  twilioMessageId?: string
  createdAt: Date
}

const MessageSchema = new Schema<IMessage>(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      enum: ['inbound', 'outbound'],
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'failed', 'received'],
      default: 'sent',
    },
    twilioMessageId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

MessageSchema.index({ leadId: 1, createdAt: -1 })
MessageSchema.index({ phoneNumber: 1 })

export default mongoose.model<IMessage>('Message', MessageSchema)

