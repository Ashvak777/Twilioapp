import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNumber = process.env.TWILIO_PHONE_NUMBER

if (!accountSid || !authToken || !phoneNumber) {
  console.warn('⚠️  Twilio credentials not found. SMS features will be disabled.')
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export interface SendSMSOptions {
  to: string
  body: string
}

export const sendSMS = async (options: SendSMSOptions): Promise<string | null> => {
  if (!client || !phoneNumber) {
    console.error('Twilio client not initialized')
    return null
  }

  try {
    const message = await client.messages.create({
      body: options.body,
      from: phoneNumber,
      to: options.to,
    })

    return message.sid
  } catch (error: any) {
    console.error('Error sending SMS:', error)
    throw new Error(`Failed to send SMS: ${error.message}`)
  }
}

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // If it starts with 1, remove it (US country code)
  const cleaned = digits.startsWith('1') && digits.length === 11 ? digits.slice(1) : digits
  
  // Format as +1XXXXXXXXXX
  return `+1${cleaned}`
}

export default {
  sendSMS,
  formatPhoneNumber,
}

