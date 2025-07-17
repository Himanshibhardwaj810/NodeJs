//Menu schema is created here
const mongoose=require('mongoose');

const MenuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true//This is also mandatory
    },
    taste:{
        type:String,
        enum:["Spicy","Sweet","Sour","Salty"],//to pass multiple choices
        required:true
    },
    is_drink:{
        type:Boolean,
       default:false //Default value is false, until it is true by client
    },
    ingredients:{
        type:[String], //Array of strings to hold multiple ingredients
        default:[] //Default to an empty array if no ingredients are provided
        
    },
    num_sales:{
        type:Number,
        default:0 //Default to 0 sales
    }

})

 //Create model of MenuItem
const Menu=mongoose.model('Menu',MenuItemSchema);
module.exports=Menu;