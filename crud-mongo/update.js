const dbConnection = require('../config/mongodb');

const updateData = async () => {
  let db = await dbConnection();
  let result = await db.updateOne(
    { name: 'Note 8 Pro' },
    { $set: { name: 'Note 7 Pro' } }
  );
  if (result.acknowledged) {
    console.log('Data Updated...!');
  } else {
    console.log('Data not Updated...!');
  }
}

// updateData();