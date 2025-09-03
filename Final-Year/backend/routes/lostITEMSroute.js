const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const LostItem = require('../models/lostItem');

// POST /api/lostitems/post - Add lost item
router.post('/post', upload.single('image'), async (req, res) => {
  try {
    const { name, category, description, location } = req.body;
    let image = req.file ? req.file.filename : null;

    if (!name || !category || !description || !location) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    const newLostItem = new LostItem({
      name,
      category,
      description,
      location,
      image
    });

    await newLostItem.save();

    res.status(201).json({ message: 'Lost item posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while posting lost item' });
  }
});

// GET /api/lostitems - Get all lost items
router.get('/', async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching lost items' });
  }
});

module.exports = router;
