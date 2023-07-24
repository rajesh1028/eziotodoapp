const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    status: Boolean,
    username: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };