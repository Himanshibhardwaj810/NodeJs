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

//Create a new person Post route for new person
app.post('/person', async (req, res) => {
    try {
        const data = req.body;//Get the data from the request body parsed by bodyParser

        const newPerson = new person(data);//Create a new instance of the person model with the data
        //newPerson.name=data.name;

        //save the newPerson to database
        const savednewperson = await newPerson.save()
        console.log("Person data is saved successfully");
        res.status(200).json(savednewperson);

    } catch (error) {
        console.log("There is error while saving the person:", error);
        res.status(500).json({ error: "Internal server error" })
    }
})

//Get method to fetch data from database
app.get('/person',async(req,res)=>{
    try{//here person is imported data model
        const data=await person.find();//Fetch all the data from person collection
        console.log("Person data is fetched from database successfully");
        res.status(200).json(data);

    }catch(error){
        console.log("There is error while saving the person:", error);
        res.status(500).json({ error: "Internal server error" })

    }
})

//Post method to create a new menu item
app.post('/menu',async(req,res)=>{
    try{
        const data=req.body;
        const newMenuItem=new Menu(data);

        const result=await newMenuItem.save();
        console.log("Menu item is saved successfully");
        res.status(200).json(result);
    }catch(error){
        console.log("Internal server error",error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//Get method to fetch all menu items
app.get('/menu',async(req,res)=>{
    try{
        const menuItem=await Menu.find();//Fetch all the menu items from the Menu collection
        console.log("Person data is fetched from database successfully");
        res.status(200).json(data);
    }catch(error){
        console.log("There is error while fetching the menu items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

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