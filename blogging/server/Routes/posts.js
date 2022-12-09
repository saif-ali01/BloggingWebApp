const router = require("express").Router();
const User = require("../Models/User.js");
const Post = require("../Models/post.js");

//CREATE POST
router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost =await newPost.save();
        
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({message :error.message});
    }
})

//UPADTE POST
router.patch("/:id",async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedPost);
            } catch (error) {
             res.status(500).json({message :error.message});
                
            }
        }else{
            res.status(401).json("You can update only your post")
        }        
    } catch (error) {
        res.status(500).json({message :error.message});
    }
 
   
})

//DELETE
router.delete("/:id",async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try {
                await post.delete()
                res.status(200).json("post has been deleted!");
            } catch (error) {
             res.status(500).json({message :error.message});
                
            }
        }else{
            res.status(401).json("You can delete only your post")
        }        
    } catch (error) {
        res.status(500).json({message :error.message});
    }
})

//GET USER
router.get("/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json("User Not Found");
        
    }
})


//GET ALL POST

router.get("/",async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }
        else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }
        else{
            posts = await Post.find()
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json("User Not Found");
        
    }
})


module.exports = router

