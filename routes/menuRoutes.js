//Menu Routes by express Router
const express=require('express');
const router=express.Router();
const Menu=require('../models/Menu.js');//Import the Menu model

//Post method to create a new menu item
router.post('/',async(req,res)=>{
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
router.get('/',async(req,res)=>{
    try{
        const menuItem=await Menu.find();//Fetch all the menu items from the Menu collection
        console.log("Person data is fetched from database successfully");
        res.status(200).json(menuItem);
    }catch(error){
        console.log("There is error while fetching the menu items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
//parameterzed API call to fetch menu items based on taste
router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType==='Sweet'|| tasteType==='Sour' || tasteType==='Spicy' || tasteType==='Salty'){
            const response=await Menu.find({taste:tasteType});//Find the menu items with the tasteType
            console.log("Menu items are fetched from database successfully");
            res.status(200).json(response);
        }else{
            res.status(400).json({error:'Invalid choice'});
        }

    }catch(error){
            console.log("There is error while fetching the menu's data:", error);
        res.status(500).json({ error: "Internal server error" });

    }
})
module.exports=router;