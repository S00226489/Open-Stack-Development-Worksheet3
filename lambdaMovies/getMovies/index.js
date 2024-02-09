// Import the MongoDB driver
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI ="mongodb+srv://Aiden:Farrell>@wp1.ayauu93.mongodb.net/"
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI);

  // Specify which database we want to use
  const db = await client.db("sample_mflix");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {

  /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectToDatabase();
  const movies = await db.collection("movies").find({}).sort({"_id":-1}).limit(20).toArray();
  const response = {
    statusCode: 200,
    body: JSON.stringify(movies),
  };

  return response;
};