const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const FoundItem = require('../models/Found');

// POST route
router.post('/post', upload.single('image'), async (req, res) => {
  try {
    const item = new FoundItem({
      name: req.body.name,
      itemName: req.body.itemName,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      dateFound: req.body.date,
      image: req.file.filename
    });

    await item.save();
    res.status(201).json({ message: '✅ Found item posted successfully!' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to save item', details: err.message });
  }
});

// GET route
router.get('/', async (req, res) => {
  try{
    const items = await FoundItem.find();
    const itemsWithImageUrls = items.map(item => ({
      ...item.toObject(),
      imageUrl: `http://localhost:3000/uploads/${item.image}` // Add full URL to image
    }));
    res.status(200).json(itemsWithImageUrls); 
  } catch(err){
    res.status(500).json({ error: '❌ Failed to fetch items', details: err.message});
  }
});



router.get('/all', async (req, res) => {
  try{
    const items = await FoundItem.find();
    const itemsWithImageUrls = items.map(item => ({
      ...item.toObject(),
      imageUrl: `http://localhost:3000/uploads/${item.image}` // Add full URL to image
    }));
    res.status(200).json(itemsWithImageUrls); 
  } catch(err){
    res.status(500).json({ error: '❌ Failed to fetch items', details: err.message});
  }
});

module.exports = router;
