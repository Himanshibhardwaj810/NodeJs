const express = require('express')
const app = express()
const db=require('./db');//Import the database connection

const person=require('./models/person');//Import the person model

app.get('/',function(req,res){
    res.send('Hello sir !How can i help you?')
})


app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})