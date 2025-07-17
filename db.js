//db.js file is responsible for managing the database operations b/w the node.js applications and mongodb using
//mongoose library
const mongoose=require('mongoose');

//Define the MongoDB Connection URL
const mongoURL='mongodb://localhost:27017/HotelsDb'

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