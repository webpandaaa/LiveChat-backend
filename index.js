const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');

const app = express();
dotenv.config();


const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Server is created");
    }catch(err){
        console.error("Server is not connected");
    }
};

connectDb();


app.get("/" , (req,res)=>{
    res.send("api is running");
})



const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is running on ${PORT} `));