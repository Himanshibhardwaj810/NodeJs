const mongoose=require('mongoose');

const personSchema=new mongoose.Schema({//TO define the structure and datatypes of
//  the documents in the collection
    name:{
        type:String,
        required:true,//to make it mandatory
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:["Chef","Waiter","Manager"],//to pass multiple choices
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,//to make it unique
    },
    salary:{
        type:Number,    
    }
})

//Create a model for the person schema
const person=mongoose.model('Person',personSchema);//Create a Model named Person using the personSchema schema.
module.exports=person;//Export the model to use it in other files