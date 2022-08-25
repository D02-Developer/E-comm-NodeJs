const express = require('express');
const productModel = require('./api/models/productModel');
const app = express();
app.use(express.json());

// FOR UPLOAD FILE
const multer = require('multer');
const uploadFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads');  // FOLDER NAME
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '_' + Date.now() + '.jpg');
    }
  })
}).single('product_file');

/* POST API FOR UPLOAD FILE **/
app.post('/upload', uploadFile, async (req, res) => {
  res.send('File Uploaded...!');
});


/* GET API **/
app.get('/get', async (req, res) => {
  let result = await productModel.find();
  res.send(result);
});


/* GET BY ID API **/
app.get('/:_id', async (req, res) => {
  let result = await productModel.find(req.params);
  res.send(result);
});


/* SEARCH API **/
app.get('/search/:key', async (req, res) => {
  console.log(req.params);
  let result = await productModel.find({
    '$or': [{
      name: { $regex: req.params.key },
      // brand: { $regex: req.params.key },
      // price: { $regex: req.params.key },
      category: { $regex: req.params.key }
    }]
  });
  res.send(result);
});


/* POST API **/
app.post('/save', async (req, res) => {
  let data = new productModel(req.body);
  let result = await data.save();
  res.send(result);
});


/* DELETE API **/
app.delete('/:_id', async (req, res) => {
  let result = await productModel.deleteOne(req.params);
  res.send(result);
});


/* PUT API **/
app.put('/:_id', async (req, res) => {
  let result = await productModel.updateOne(req.params, { $set: req.body });  // NOTE THAT
  res.send(result);
});


/* CALLING SERVER **/
app.listen(8000);