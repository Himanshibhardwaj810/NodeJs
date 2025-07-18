const express = require('express')
const app = express()
const db = require('./db');//Import the database connection
const bodyParser = require('body-parser');
const person = require('./models/person');//Import the person model
app.use(bodyParser.json());//Middleware to parse JSON request bodies into objects 
const Menu=require('./models/Menu.js');//Import the Menu model

app.get('/', function (req, res) {
    res.send('Hello sir !How can i help you?')
})

//Import the router files
const personRoutes=require('./routes/personRoutes');//Import the person routes
const menuRoutes=require('./routes/menuRoutes');//Import the menuRoutes

// Use the routers file
app.use('/person', personRoutes);//Use the person routes
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


app.listen(3001, () => {
    console.log('Server is running on port 3001');
})