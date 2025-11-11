import express from 'express'
import Lead from '../models/Lead.js'

const router = express.Router()

// Get all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })
    res.json({ leads })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get lead by ID
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }
    res.json({ lead })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create new lead
router.post('/', async (req, res) => {
  try {
    const lead = new Lead(req.body)
    await lead.save()
    res.status(201).json({ lead })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// Update lead
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }
    res.json({ lead })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// Delete lead
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }
    res.json({ message: 'Lead deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

