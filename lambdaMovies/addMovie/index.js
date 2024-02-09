const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI ="mongodb+srv://Aiden:Farrell>@wp1.ayauu93.mongodb.net/"
let cachedDb = null;

async function connectToDatabase() {

  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db('sample_mflix');
  cachedDb = db;
  return db
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  // Insert the event object, which is the test data we pass in
  const result = await db.collection("movies").insertOne(event);
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  return response;
};