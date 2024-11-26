const express = require('express');
const userModel = require("../Models/userModel");
const expressAsyncHandler = require("express-async-handler");


const loginController = () => {}

const registerController = expressAsyncHandler (async (req, res) => {
    const {name , email , password} = req.body;


    // check all validation
    if(!name || !email || !password){
        return res.status(400).json({message : "Please fill all fields"});
    }

    //pre-existing user
    const userExist = await userModel.findOne({email});
    if(userExist){
        throw  new Error("User already exist");
    }

    //username already exist
    const usernameExist = await userModel.findOne({name});
    if(usernameExist){
        throw  new Error("Username already exist");
    }

    //create a user in database
    const  user = await userModel.create({ name , email, password})
    console.log("successfully created");
})


module.exports = {loginController , registerController}