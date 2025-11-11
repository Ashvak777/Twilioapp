import express from 'express'
import Property from '../models/Property.js'

const router = express.Router()

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 })
    res.json({ properties })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    res.json({ property })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Create new property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body)
    await property.save()
    res.status(201).json({ property })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// Update property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    res.json({ property })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    res.json({ message: 'Property deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router

