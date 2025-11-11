/**
 * AI Service for generating automated responses
 * This is a simple rule-based AI. For more advanced AI, integrate with OpenAI API
 */

interface AIResponse {
  message: string
  shouldRespond: boolean
}

export const generateAIResponse = async (incomingMessage: string, context?: {
  leadName?: string
  properties?: any[]
}): Promise<AIResponse> => {
  const message = incomingMessage.toLowerCase().trim()

  // Greeting responses
  if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return {
      message: `Hello! Thank you for your interest in our properties. How can I help you today?`,
      shouldRespond: true,
    }
  }

  // Property inquiry
  if (message.match(/(property|house|home|listing|available|price|cost)/)) {
    const propertyCount = context?.properties?.length || 0
    if (propertyCount > 0) {
      return {
        message: `We have ${propertyCount} properties available! Would you like to see details about a specific property, or tell me what you're looking for (bedrooms, bathrooms, price range)?`,
        shouldRespond: true,
      }
    } else {
      return {
        message: `I'd be happy to help you find a property! What are you looking for? (e.g., 3 bedrooms, 2 bathrooms, under $500,000)`,
        shouldRespond: true,
      }
    }
  }

  // Bedroom inquiry
  if (message.match(/(\d+)\s*(bed|bedroom|br)/)) {
    const match = message.match(/(\d+)/)
    const bedrooms = match ? parseInt(match[0]) : null
    return {
      message: bedrooms
        ? `Great! I'll look for ${bedrooms} bedroom properties. What's your price range?`
        : `I'd be happy to help you find properties! How many bedrooms are you looking for?`,
      shouldRespond: true,
    }
  }

  // Price inquiry
  if (message.match(/(\$\d+|\d+\s*(k|thousand|million))/)) {
    return {
      message: `Perfect! I'll search for properties in that price range. What area are you interested in?`,
      shouldRespond: true,
    }
  }

  // Contact request
  if (message.match(/(contact|call|speak|talk|agent|realtor)/)) {
    return {
      message: `I'd be happy to connect you with one of our agents! Please provide your name and best time to contact you, or call us directly.`,
      shouldRespond: true,
    }
  }

  // Thank you
  if (message.match(/(thank|thanks|appreciate)/)) {
    return {
      message: `You're welcome! Is there anything else I can help you with?`,
      shouldRespond: true,
    }
  }

  // Default response
  return {
    message: `Thank you for your message! I'm here to help you find the perfect property. You can ask me about available properties, prices, or schedule a viewing.`,
    shouldRespond: true,
  }
}

export const shouldAutoRespond = (message: string): boolean => {
  const lowerMessage = message.toLowerCase()
  
  // Don't auto-respond to these
  const skipPatterns = [
    /^(stop|unsubscribe|cancel|no more)/,
    /^(yes|yep|ok|okay|sure)$/,
  ]

  return !skipPatterns.some(pattern => pattern.test(lowerMessage))
}

export default {
  generateAIResponse,
  shouldAutoRespond,
}

