const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');//Import bcrypt for password hashing


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
    },
    username:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },

})

//Middleware to hash the password before saving the person document
personSchema.pre('save',async function(next){
    const person=this;//so that it applies to each of the person data
    
    //Hash the password only if it is new or password is modified
    if(!person.isModified('password')){
        return next();//If password is not modified, skip hashing
    }

    try{
        //salt generation
        const salt=await bcrypt.genSalt(10);//Generate a salt with 10 rounds
        //hash the password with the generated salt
        const hashedpassword=await bcrypt.hash(person.password,salt);

        //override the person password with the hashed password
        person.password=hashedpassword;
        next();//Call the next middleware

    }catch(error){
        return next(error);

    }
});

//Compare the password with hashed One
personSchema.methods.comparePassword=async function(personPassword){
    try{
        //use bcrypt to compare the password with the hashed password
        const isMatch=await bcrypt.compare(personPassword,this.password);//compare the provided password with the stored hashed password
        return isMatch;//Return true if passwords match, otherwise false

    }catch(error){
        throw error;//Throw an error if comparison fails
    }
}

//Create a model for the person schema
const person=mongoose.model('Person',personSchema);//Create a Model named Person using the personSchema schema.
module.exports=person;//Export the model to use it in other files