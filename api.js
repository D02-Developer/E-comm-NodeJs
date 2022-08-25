const express = require('express');
const dbConnection = require('./config/mongodb');
const mongodb = require('mongodb');
const app = express();
app.use(express.json());

/* GET API **/
app.get('/get', async (req, res) => {
  let db = await dbConnection();
  let result = await db.find().toArray();
  res.send(result);
});

/* POST API **/
app.post('/save', async (req, res) => {
  let db = await dbConnection();
  let result = await db.save(req.body);
  res.send(result);
});

/* PUT API **/
app.put('/update', async (req, res) => {
  let db = await dbConnection();
  let result = await db.updateOne(
    { name: req.body.name },
    { $set: req.body }
  );
  res.send(result);
});

/* PUT API THROUGH PARAMS **/
app.put('/:id', async (req, res) => {
  let db = await dbConnection();
  let result = await db.updateOne(
    { _id: new mongodb.ObjectId(req.params.id) },   // NOTE THAT
    { $set: req.body }
  );
  console.log(req.body);
  res.send(result);
});

/* DELETE API **/
app.delete('/:id', async (req, res) => {
  let db = await dbConnection();
  let result = await db.deleteMany(
    { _id: new mongodb.ObjectId(req.params.id) }  // NOTE THAT
  );
  res.send(result);
});

/* CALLING SERVER **/
app.listen(8000);


/* USE SCHEMA AND MODEL IN NODE */
const mongoose = require('mongoose');
const database = 'mongodb://localhost:27017/e-comm';

mongoose.connect(database);
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String
});

const save = async () => {
  const productModel = mongoose.model('products', productSchema);
  let model = new productModel({ price: 450 });
  let result = await model.save();
  console.log(result);
};
// save();

const update = async () => {
  const productModel = mongoose.model('products', productSchema);
  let result = await productModel.updateOne(
    { name: 'Note 7 Pro' },
    { $set: { price: 550 } }
  );
  console.log(result);
};
// update();

const remove = async () => {
  const productModel = mongoose.model('products', productSchema);
  let result = await productModel.deleteMany(
    { price: 450 }
  );
  console.log(result);
};
// remove();

const find = async () => {
  const productModel = mongoose.model('products', productSchema);
  let result = await productModel.find();
  console.log(result);
};
// find();


/** LEARN ABOUT OS FUNCTIONS */

// const os = require('os');
// console.log(os.arch());   // Show the Architecture of OS
// console.log(os.freemem() / (1024*1024*1024));   // Show the Free RAM (In GB) of OS
// console.log(os.totalmem() / (1024*1024*1024));   // Show the Total RAM (In GB) of OS
// console.log(os.hostname());   // Show the Host Name of OS
// console.log(os.platform());   // Show the Plateform of OS
// console.log(os.userInfo());   // Show the UserInfo of OS


