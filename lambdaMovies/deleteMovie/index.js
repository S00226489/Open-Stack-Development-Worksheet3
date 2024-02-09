// Import the MongoDB driver
const MongoClient = require("mongodb").MongoClient;
let cachedDb = null;

const MONGODB_URI ="mongodb+srv://Aiden:Farrell>@wp1.ayauu93.mongodb.net/"


async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db("sample_mflix");
  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {

  /* By default, the callback waits until the runtime event loop is empty before 
  freezing the process and returning the results to the caller. 
  Setting this property to false requests that AWS Lambda freeze the 
  process soon after the callback is invoked, even if there are events in 
  the event loop. AWS Lambda will freeze the process, any state data, and the 
  events in the event loop. Any remaining events in the event loop are 
  processed when the Lambda function is next invoked, if AWS Lambda chooses 
  to use the frozen process. */
  context.callbackWaitsForEmptyEventLoop = false;

  // Get an instance of our database
  const db = await connectToDatabase();

  const { ObjectId } = require('mongodb');
  const id=event.pathParameters["id"];
  const o_id = new ObjectId(new ObjectId(id));  

  const query = { "_id": o_id };
   
  const movie = await db.collection("movies").deleteOne(query);
  


  const response = {
    statusCode: 200,
    body: JSON.stringify(movie),
  };

  return response;
};