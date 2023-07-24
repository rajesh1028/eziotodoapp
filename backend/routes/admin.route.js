const express = require("express");
const adminRoute = express.Router();
const jwt = require("jsonwebtoken");
const { TodoModel } = require("../models/todo.model");
const { authenticate } = require("../middlewares/authenticate");
require("dotenv").config();

adminRoute.get("/todos", authenticate, async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json({ todos });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

adminRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = {
        _id: "admin"
    }
    try {
        if (email === "admin@gmail.com" && password == "admin") {
            const token = jwt.sign({ user }, process.env.key, { expiresIn: "4h" });
            res.status(200).json({ "msg": "login successfull", token })
        } else {
            res.send("Invalid credentials");
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

module.exports = { adminRoute };