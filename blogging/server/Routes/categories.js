const router = require("express").Router();
const Category = require("../Models/Category.js");
const Post = require("../Models/post.js");

router.post("/",async(req,res)=>{
    try {
        const newCat = new Category(req.body);
        
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/",async(req,res)=>{
    try {
       const cats = await Category.find();
        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router