import express from 'express'
import Message from '../models/Message.js'
import Lead from '../models/Lead.js'
import Property from '../models/Property.js'
import { sendSMS, formatPhoneNumber } from '../services/twilioService.js'
import { generateAIResponse, shouldAutoRespond } from '../services/aiService.js'

const router = express.Router()

// Get all communications (conversations summary)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: '$leadId',
          lastMessage: { $first: '$body' },
          lastMessageTime: { $first: '$createdAt' },
          messageCount: { $sum: 1 },
          unreadCount: {
            $sum: {
              $cond: [{ $eq: ['$direction', 'inbound'] }, 1, 0],
            },
          },
          phoneNumber: { $first: '$phoneNumber' },
        },
      },
    ])

    // Populate lead information
    const communications = await Promise.all(
      messages.map(async (msg) => {
        const lead = await Lead.findById(msg._id)
        return {
          _id: msg._id.toString(),
          leadId: msg._id.toString(),
          leadName: lead?.name || 'Unknown',
          phoneNumber: msg.phoneNumber,
          lastMessage: msg.lastMessage,
          lastMessageTime: msg.lastMessageTime,
          messageCount: msg.messageCount,
          unreadCount: msg.unreadCount,
        }
      })
    )

    res.json({ communications })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get messages for a specific lead
router.get('/:leadId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ leadId: req.params.leadId })
      .sort({ createdAt: 1 })
    res.json({ messages })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get conversation by phone number
router.get('/conversation/:phoneNumber', async (req, res) => {
  try {
    const formattedPhone = formatPhoneNumber(req.params.phoneNumber)
    const messages = await Message.find({ phoneNumber: formattedPhone })
      .sort({ createdAt: 1 })
    res.json({ messages })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Send message to a lead
router.post('/:leadId/send', async (req, res) => {
  try {
    const { body } = req.body
    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Message body is required' })
    }

    const lead = await Lead.findById(req.params.leadId)
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    const formattedPhone = formatPhoneNumber(lead.phone)
    
    // Send SMS via Twilio
    let twilioMessageId = null
    try {
      twilioMessageId = await sendSMS({
        to: formattedPhone,
        body: body.trim(),
      })
    } catch (error: any) {
      console.error('Failed to send SMS:', error)
      // Continue to save message even if SMS fails
    }

    // Save message to database
    const message = new Message({
      leadId: lead._id,
      phoneNumber: formattedPhone,
      direction: 'outbound',
      body: body.trim(),
      status: twilioMessageId ? 'sent' : 'failed',
      twilioMessageId,
    })
    await message.save()

    res.json({ message })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Webhook endpoint for receiving SMS from Twilio
router.post('/webhook/sms', async (req, res) => {
  try {
    const { From, Body, MessageSid } = req.body

    if (!From || !Body) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const formattedPhone = formatPhoneNumber(From)
    
    // Find or create lead by phone number
    let lead = await Lead.findOne({ phone: formattedPhone })
    if (!lead) {
      // Create new lead from incoming message
      lead = new Lead({
        name: 'Unknown',
        phone: formattedPhone,
        email: '',
        status: 'new',
      })
      await lead.save()
    }

    // Save incoming message
    const message = new Message({
      leadId: lead._id,
      phoneNumber: formattedPhone,
      direction: 'inbound',
      body: Body,
      status: 'received',
      twilioMessageId: MessageSid,
    })
    await message.save()

    // Update lead status if it's new
    if (lead.status === 'new') {
      lead.status = 'contacted'
      await lead.save()
    }

    // Generate AI response if auto-respond is enabled
    if (shouldAutoRespond(Body)) {
      const properties = await Property.find({ status: 'available' })
      const aiResponse = await generateAIResponse(Body, {
        leadName: lead.name,
        properties: properties,
      })

      if (aiResponse.shouldRespond) {
        try {
          // Send AI response
          const twilioMessageId = await sendSMS({
            to: formattedPhone,
            body: aiResponse.message,
          })

          // Save AI response message
          const responseMessage = new Message({
            leadId: lead._id,
            phoneNumber: formattedPhone,
            direction: 'outbound',
            body: aiResponse.message,
            status: 'sent',
            twilioMessageId,
          })
          await responseMessage.save()
        } catch (error: any) {
          console.error('Failed to send AI response:', error)
        }
      }
    }

    // Respond to Twilio webhook
    res.type('text/xml')
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>')
  } catch (error: any) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router

