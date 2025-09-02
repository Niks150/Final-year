const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  name: String,
  itemName: String,
  category: String,
  description: String,
  location: String,
  dateFound: Date,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoundItem', foundItemSchema);
