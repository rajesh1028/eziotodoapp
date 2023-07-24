const express = require("express");
const { TodoModel } = require("../models/todo.model");
const { authenticate } = require("../middlewares/authenticate");
const todoRoute = express.Router();
require("dotenv").config();

todoRoute.get("/", authenticate, async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json({ todos });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

todoRoute.post("/add", authenticate, async (req, res) => {
    const { title, description, status, username } = req.body;
    try {
        const todo = new TodoModel({ title, description, status, username });
        await todo.save();
        res.status(201).json({ "msg": "Todo added successfully", todo });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

todoRoute.patch("/update/:id", authenticate, async (req, res) => {
    const _id = req.params.id;
    const { title, description, status, username } = req.body;
    try {
        const todo = await TodoModel.findByIdAndUpdate({ _id }, { title, description, status, username })
        res.status(201).json({ "msg": "Todo updated successfully", todo });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

todoRoute.delete("/delete/:id", authenticate, async (req, res) => {
    const _id = req.params.id;
    try {
        const todo = await TodoModel.findByIdAndDelete({ _id });
        res.status(201).json({ "msg": "Todo deleted successfully", todo });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

module.exports = { todoRoute };