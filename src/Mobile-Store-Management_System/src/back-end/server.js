const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const multer = require('multer');
const Product = require('./models/Product');
// const Category = require('./models/Category');

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

//8.import routes file
    //login
    const user = require("./routes/user.js");

    //product
const productRouter = require("./routes/product.js");

    //finance
const incomeRouter = require("./routes/incomes.js")
const expenseRouter = require("./routes/expenses.js")
    //salary
const SalaryRouter = require("./routes/Salary_routes.js");
const EmployeeRouter = require("./routes/Employee_routes.js");
    //supplier
const supplier_deliverydetails_route = require("./routes/supplier_deliverydetails_route.js")
const supplier_details_route = require("./routes/supplier_details_route.js")
    //order
const productRouter2 = require("./routes/product2.js");
const orders = require("./routes/orders.js");
    //deliver
const deliveryRouter = require("./routes/deliveryGuys.js");
const orderRouter = require("./routes/deliveryOrder.js");
    //customer
const customerrouter = require("./routes/customer_routes.js");
const Addinquiryrouter = require("./routes/Addinquiry_routes.js");
    

    //repair


//9.run route file using express

app.use("/api",user);
app.use("/product",productRouter);


//finance
app.use("/income",incomeRouter)
app.use("/expense",expenseRouter)

//employee
app.use("/Salary",SalaryRouter)
app.use("/employee",EmployeeRouter)

//supplier
app.use("/supplier_deliverydetails",supplier_deliverydetails_route)
app.use("/supplier_details",supplier_details_route)

//order
app.use("/api",productRouter2);
app.use("/api", orders);

//deliver guy
app.use("/deliveryOrder",orderRouter);
app.use("/deliveryGuys",deliveryRouter);

//customer
app.use("/addinquiry",Addinquiryrouter);
app.use("/customer",customerrouter);











//10.run server in port
app.listen(PORT, () => {
    console.log(`server is up and running on port no :  ${PORT}`)
    
})