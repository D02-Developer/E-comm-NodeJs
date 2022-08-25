const mongoose = require('mongoose');
const database = 'mongodb://localhost:27017/e-comm';
mongoose.connect(database);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String
});

module.exports = productSchema;
