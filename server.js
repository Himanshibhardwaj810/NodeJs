const express = require('express')
const app = express()
const db = require('./db');//Import the database connection
const bodyParser = require('body-parser');
app.use(bodyParser.json());//Middleware to parse JSON request bodies into objects
const passport=require('./auth');

require('dotenv').config();//Take the environment variables from .env file

//setting the Middleware
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request made to URl:${req.originalUrl}`);
    next(); //Call the next middleware 

}
app.use(logRequest);


//This activates Passport in your Express app.
app.use(passport.initialize());//Initialize passport middleware

const PORT=process.env.PORT||3001;//Set the port from environment variable or default to 3001
//if code is installed on another machine then they will use different PORT otherwise LOcalhost


const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/',function (req, res) {
    res.send('Hello sir !How can i help you?')
})

//Import the router files
const personRoutes=require('./routes/personRoutes');//Import the person routes
const menuRoutes=require('./routes/menuRoutes');//Import the menuRoutes
const { findLastKey } = require('lodash');

// Use the routers file
app.use('/person',localAuthMiddleware ,personRoutes);//Use the person routes
app.use('/menu',menuRoutes);//Use the menu routes

//***********this is old save method using callback******************* */
// //Create a new person Post route for new person
// app.post('/person',(req,res)=>{
//     const data=req.body;//Get the data from the request body parsed by bodyParser

//     const newPerson=new person(data);//Create a new instance of the person model with the data
// //newPerson.name=data.name;

// //save the newPerson to database
// newPerson.save((error,savedperson)=>{
//     if(error){
//         console.log("There is error while saving the person:",error);
//         res.status(500).json({error:"Internal server error"})
//     }else{
//         console.log("Person data is saved successfully");
//         res.status(200).json(savedperson);
//     }
// })
// })


app.listen(PORT, () => {
    console.log('Server is running on port 3001');
})