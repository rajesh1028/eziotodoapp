const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();
require("dotenv").config();

userRoute.get("/", async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

userRoute.post("/register", async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        bcrypt.hash(password,6,async (err,hashed_password)=>{
            if(err){
                console.log(err);
                res.send(err);
            }
            const user = new UserModel({ name, email, phone, password:hashed_password });
            await user.save();
            res.status(201).json({"msg":"User created successfully",user});
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user) res.send("No users found for this email");
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token = jwt.sign({user},process.env.key,{expiresIn:"4h"});
                res.status(200).json({"msg":"login successfull",token, username:user.name})
            }else{
                res.send("Invalid password");
            }
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

module.exports = { userRoute };