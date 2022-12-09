const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/Users.js");
const postRoute = require("./Routes/posts.js");
const categoriesRoute = require("./Routes/categories.js");
const multer = require("multer");
const cors = require("cors");
const path = require("path");


dotenv.config();

app.use(express.json())
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL  )
.then(console.log("DBconnected"))
.catch((error)=>{console.log(error)})
// cb means callback function
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoriesRoute);




app.listen("5000",()=>{
    console.log("Server Start");
})