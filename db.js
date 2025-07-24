//db.js file is responsible for managing the database operations b/w the node.js applications and mongodb using
//mongoose library
const mongoose=require('mongoose');
require('dotenv').config();//Load environment variables from .env file

//Define the MongoDB Connection URL

//we can also connect to local host by typing mongosh command and pasting url here
// const mongoURL=  MONGO_DB_URL_LOCAL;

const mongoURL=process.env.DB_URL;//Get the MongoDB URL from environment variable

//Set up MongoDB connection
mongoose.connect(mongoURL)
  // .then(() => {
  //   console.log("✅ Connected to MongoDB server");
  // })
  // .catch((err) => {
  //   console.error("❌ Error connecting to MongoDB:", err);
  // });

//Get the default connection onject
//Mongoose maintain the default connection object to represent Mongodb connection
const db=mongoose.connection;

//Define event listeners for the connection
db.on('connected',()=>{
    console.log(" Connected to MongoDB server")
});

db.on('error',(err)=>{
    console.error("Error connecting to MongoDB:", err);
});

db.on('disconnected',()=>{
    console.log("Disconnected from MongoDB server");
})

//Export the db connection object to use it in other files of node.js applications
module.exports=db;