const dbConnection = require('../config/mongodb');

/* 1ST METHOD **/
// dbConnection().then((resp) => {
//   resp.find().toArray().then((data) => {
//     console.log(data);
//   });
// });

/* 2ND METHOD **/
const getData = async () => {
  let db = await dbConnection();
  let result = await db.find().toArray();
  if (result) {
    console.log(result);
    console.log('Data Fetched...!');
  } else {
    console.log('Data not Fetched...!');
  }
}

getData();