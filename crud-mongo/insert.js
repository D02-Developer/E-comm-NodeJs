const dbConnection = require('../config/mongodb');

const insertData = async () => {
  let db = await dbConnection();

  /* SINGLE RECORD INSERT **/
  let result = await db.insertOne({
    name: 'Note 8 Pro',
    brand: 'RedMi',
    price: '500',
    category: 'Mobile'
  });

  /* MULTIPLE RECORD INSERT **/
  // let result = await db.insertMany([
  //   {
  //     name: 'Note 10',
  //     brand: 'Samsung',
  //     price: '1700',
  //     category: 'Mobile'
  //   },
  //   {
  //     name: 'M22',
  //     brand: 'Samsung',
  //     price: '700',
  //     category: 'Mobile'
  //   }
  // ]);


  if (result.acknowledged) {
    console.log('Data Created...!');
  } else {
    console.log('Data not Created...!');
  }
}

// insertData();