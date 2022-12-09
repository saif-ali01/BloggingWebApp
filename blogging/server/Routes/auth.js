const router =require("express").Router();
const User =require("../Models/User.js");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register",async(req,res)=>{
    try {
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,10)
        })
        
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})



//LOGIN

router.post('/login',async(req,res)=>{
    const {email,username,password}=req.body;
    try {
        const user = await User.findOne({username:username})

        if(user){
            const validity =await bcrypt.compareSync(password,user.password)
            if(validity){
                const {password, ...others} = user._doc;
                res.status(200).json(others)
            }
            else{
                res.status(400).json("Wrong Password")
            }
          
        }
        else{
            res.status(400).json("User Not EXISTS")

        }
        
    } catch (error) {
        res.status(500).json({message :error.message});
    }
})


module.exports = router