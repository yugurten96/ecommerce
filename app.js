const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const mongoose  = require("mongoose");
const cors = require("cors");

app.use(cors());
app.options("*", cors)

//Middleware
app.use(express.json());
app.use(morgan("tiny"))

//allow th cors for any application

//routes
const categoriesRoutes = require("./routes/categories")
const productsRoutes = require("./routes/products")
const userRoutes = require("./routes/users")
const ordersRoutes = require("./routes/orders")

app.use("/categories", categoriesRoutes)
app.use("/products", productsRoutes)
app.use("/users", userRoutes)
app.use("/orders", ordersRoutes)

//mongodb
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

app.listen(3000, ()=>{
    console.log("server running on port 3000")
})


