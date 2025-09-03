const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },  // store filename here
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LostItem', lostItemSchema);
