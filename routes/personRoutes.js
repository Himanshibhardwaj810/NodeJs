//Express Router is a way to modularize and organize your route handling code in an 
// Express.js application.

const express=require('express');
const router=express.Router();
const person=require('../models/person');//Import the person model
// ./models/person = same folder ke andar models/person
// ../models/person = ek folder peeche jaake models/person

//Create a new person Post route for new person
router.post('/', async (req, res) => {
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

//Get method to fetch data of person from database
router.get('/',async(req,res)=>{
    try{//here person is imported data model
        const data=await person.find();//Fetch all the data from person collection
        console.log("Person data is fetched from database successfully");
        res.status(200).json(data);

    }catch(error){
        console.log("There is error while saving the person:", error);
        res.status(500).json({ error: "Internal server error" })

    }
})

//Get method with parameterised API call for person data based on workType
router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;//Get the workType from the request parameters
        //Fetch the person data based on the workType
        if(workType==='Chef' || workType==='Waiter' || workType==='Manager'){
            const response=await person.find({work:workType});//Find the person with the workType
            //Finds all persons in DB whose work field matches workType
            console.log("Person data is fetched from database successfully");
            res.status(200).json(response);
        }else{
            res.status(400).json({error:'Invalid choice'});
        }
    }
    catch(error){
        console.log("There is error while fetching the person data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports=router;
