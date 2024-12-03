const UserModel = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");


// login
const loginController = expressAsyncHandler(async (req, res) => {
    const { name , password} = req.body;
    const user = await UserModel.findOne({name});

    if(user && (await user.matchPassword(password))){
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          };
          res.json(response);
    }else{
        throw new Error("Invalid Username or Password");
    }
})  

const registerController = expressAsyncHandler (async (req, res) => {
    const {name , email , password} = req.body;


    // check all validation
    if(!name || !email || !password){
        return res.status(400).json({message : "Please fill all fields"});
    }

    //pre-existing user
    const userExist = await UserModel.findOne({email});
    if(userExist){
        return res.status(405).json({message : "User already exist"});
        // throw  new Error("User already exist");
    }

    //username already exist
    const usernameExist = await UserModel.findOne({name});
    if(usernameExist){
        return res.status(406).json({message : "Username already exist"});
    }

    //create a user in database
    const  user = await UserModel.create({ name , email, password})
    if(user){
        res.status(201).json({
            _id :  user._id,
            name :  user.name,
            email : user.email,
            isAdmin :  user.isAdmin,
            token : generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Register Error");
    }
})

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await UserModel.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.send(users);
  });
  
  module.exports = {
    loginController,
    registerController,
    fetchAllUsersController,
  };