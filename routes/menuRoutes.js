//Menu Routes by express Router
const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu.js');//Import the Menu model

//Post method to create a new menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new Menu(data);

        const result = await newMenuItem.save();
        console.log("Menu item is saved successfully");
        res.status(200).json(result);
    } catch (error) {
        console.log("Internal server error", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

//Get method to fetch all menu items
router.get('/', async (req, res) => {
    try {
        const menuItem = await Menu.find();//Fetch all the menu items from the Menu collection
        console.log("Person data is fetched from database successfully");
        res.status(200).json(menuItem);
    } catch (error) {
        console.log("There is error while fetching the menu items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
//parameterzed API call to fetch menu items based on taste
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType === 'Sweet' || tasteType === 'Sour' || tasteType === 'Spicy' || tasteType === 'Salty') {
            const response = await Menu.find({ taste: tasteType });//Find the menu items with the tasteType
            console.log("Menu items are fetched from database successfully");
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid choice' });
        }

    } catch (error) {
        console.log("There is error while fetching the menu's data:", error);
        res.status(500).json({ error: "Internal server error" });

    }
})

//put method to update menu item by id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const response = await Menu.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }
        );
        if (!response) {//If the id is not present in the database
            return res.status(404).json({ error: 'Menu item not found by provided id' })
        }
        console.log("Updated successfully");
        res.status(200).json(response);

    } catch (error) {
        console.log("there is problem while updating the data", error);
        res.status(500).json({ error: "There is internal server error" })
    }
})

//Delete method to delete menu item by id

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Menu.findByIdAndDelete(id);
        if (!response) {//If the id is not present in the database
            return res.status(404).json({ error: 'Menu item not found by provided id' })
        }
        console.log("Deleted successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log("there is problem while deleting the data", error);
        res.status(500).json({ error: "There is internal server error" })
    }
});
module.exports = router;