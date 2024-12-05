const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRoutes = require("./Routes/userRoutes")

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors()); 


// Server Creation
const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Server is created");
    }catch(err){
        console.error("Server is not connected");
    }
};
connectDb();

// 
app.get("/" , (req,res)=>{
    res.send("api is running");
})

app.use("/user/" , userRoutes);



const PORT = process.env.PORT;
app.listen(PORT, console.log(`server is running on ${PORT} `));