const router = require("express").Router();
const User = require("../Models/User.js");
const bcrypt =require("bcrypt");
const Post = require("../Models/post.js");
//UPDATE
router.patch("/:id",async(req,res)=>{
    console.log(req.body.userId === req.params.id);
    
    if(req.body.userId === req.params.id){
         if(req.body.password){
             req.body.password=await bcrypt.hashSync(req.body.password,10);
            }
         try {
             const fetchuser= await User.findById(req.params.id);
             var userId = req.body.userId;
             const updateUser  = await User.findByIdAndUpdate(userId,req.body)
             //    const updateUser =await User.findByIdAndUpdate(req.params.id,{
        //         $set:req.body

        //         }
        //     },{new:true})
        console.log("done")
        
             res.status(200).json(updateUser);
            
         } catch (error) {
             res.status(500).json({message :error.message});
         }
    }
    else{
        res.status(401).json("You can update only your account");
    }
})

//DELETE
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
        try {
            const user =await User.findById(req.params.id)
            
            try {
                await Post.deleteMany({username:user.username})
                await User.findOneAndDelete(req.params.id)
                res.status(200).json("User has been Delete");
                
            } catch (error) {
                res.status(500).json({message :error.message});
            }
        } catch (error) {
            res.status(404).json("User Not Found");
        }
       
    }
    else{
        res.status(401).json("You can update only your account");
    }
})

//GET USER
router.get("/:id",async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json(others);

    } catch (error) {
        res.status(404).json("User Not Found");
        
    }
})


module.exports = router

