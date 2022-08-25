const dbConnection = require('../config/mongodb');

const deleteData = async () => {
  let db = await dbConnection();
  let result = await db.deleteOne(
    { name: 'Note 7 Pro' }
  );
  if (result.acknowledged) {
    console.log('Data Deleted...!');
  } else {
    console.log('Data not Deleted...!');
  }
}

// deleteData();