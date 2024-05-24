const express = require('express');
const Drawing = require('../models/Drawing');
const router = express.Router();

// Create a new drawing
router.post('/', async (req, res) => {
  const { userId, title, image } = req.body;
  try {
    const newDrawing = new Drawing({ userId, title, image });
    await newDrawing.save();
    res.status(201).json(newDrawing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all drawings
router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.find().populate('userId', 'username');
    res.status(200).json(drawings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get drawings by user
router.get('/user/:userId', async (req, res) => {
  try {
    const drawings = await Drawing.find({ userId: req.params.userId });
    res.status(200).json(drawings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a drawing
router.delete('/:id', async (req, res) => {
  try {
    await Drawing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Drawing deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;