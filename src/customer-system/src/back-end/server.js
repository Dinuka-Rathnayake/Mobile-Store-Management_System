const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

//2.assign packages functions
const app = express(); 
require("dotenv").config();

//3.assign port 
const PORT = process.env.PORT || 8070;

//4.run express funtions
app.use(cors());
app.use(bodyParser.json());

//5.assign database URL
const URL = process.env.MONGODB_URL;

//6.connecet Database
mongoose.connect(URL, {
    useNewUrlParser : true,
    useUnifiedTopology: false,
    
})

//7.make conection with database
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongodb connection is successful");
})

//8.import routes file & run route file using express

const supplier_deliverydetails_route = require("./routes/supplier_deliverydetails_route.js")
app.use("/supplier_deliverydetails",supplier_deliverydetails_route)

const supplier_details_route = require("./routes/supplier_details_route.js")
app.use("/supplier_details",supplier_details_route)

const user = require("./routes/user.js");
const auth = require("./middleware/auth.js");
const categoryRoutes = require("./routes/category");
const cartRoutes = require("./routes/cart.js");
const productRouter = require("./routes/product.js");
const orders = require("./routes/admin/orders.js");

app.use("/api",user);
app.use("/api", categoryRoutes);
app.use("/api", cartRoutes);
app.use("/api",productRouter);
app.use("/api", orders);


//9.run server in port
app.listen(PORT, () => {
    console.log(`server is up and running on port no :  ${PORT}`)
})