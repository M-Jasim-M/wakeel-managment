const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  price: Number,
  image: String,
});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;