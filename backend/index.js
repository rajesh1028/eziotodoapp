const express = require("express");
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/user.route");
const { adminRoute } = require("./routes/admin.route");
const { todoRoute } = require("./routes/todo.route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/todo", todoRoute);


app.listen(8800, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server listening on PORT 8800");
})