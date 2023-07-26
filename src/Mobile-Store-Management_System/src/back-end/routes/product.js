//1.import packages
const router = require("express").Router()
const {Router} = require("express");
let Product = require("../models/Product.js")



//2.execute Router function to send data to database
router.route("/add").post((req, res) =>{

    const name = req.body.product_name;
    const description = req.body.product_description;
    const price = Number(req.body.product_price1);
    const quantity = Number(req.body.product_stock);
    const weight = Number(req.body.product_weight);
    const imgUrl = req.body.imgUrl;

    const mainCategory = req.body.main_category;
    const subCategory = req.body.sub_category;

    console.log("this is weight " + req.body.main_category);

    // const product_main_category = req.body.product_main_category;
    
    
    // const product_new_arrival = req.body.product_new_arrival;
    // const product_discount = Number(req.body.product_discount);
    // const product_seo_description = req.body.product_seo_description;
    
    



    // create object of Student model
    const newProduct = new Product({

        name,
        description,
        price,
        quantity,
        weight,
        imgUrl,
        mainCategory,
        subCategory,
        
    })
    console.log(newProduct);

    // pass the object to mongodb trough Student model
    newProduct.save().then(() =>{
        res.json("product Added");  
    }).catch((err) => {
        console.log(err);
    })
})

//retreive data from db
router.route("/").get((req, res) => {
    Product.find().then((products) =>{
        res.json(products)
    }).catch(() => {
        console.log(err);
    })
})

//retreive data from specific id
router.route("/get/:id").get(async(req, res) =>{
    let userId = req.params.id;

    await Product.findById(userId).then((product) => {
        res.status(200).send({status: "user fetch", product})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status : "Error with get user", error:err.message}); 
    })
    
})

//update data db
router.route("/update/:id").put(async (req, res) =>{
    let userId = req.params.id;
    console.log("user id is : " + userId);

    //tried using destructure but not working
    // const {names, ages, genders} = req.body;
    // console.dir("user name is : " + req.body.names);

    //assign the data which are comming from frontend to variables 
    const description = req.body.product_description;
    const name = req.body.product_name;
    // console.log("name : "+name)
    
    const price = req.body.product_price1;
    
    const quantity = req.body.product_stock;
    const weight = Number(req.body.product_weight);
    const imgUrl = req.body.imgUrl;
    const mainCategory = req.body.main_category;
    const subCategory = req.body.sub_category;
    
    // console.dir(names);

    const updateProduct = {
        
        description,
        name,
        price,
        quantity,
        weight,
        imgUrl,
        mainCategory,
        subCategory
        
        
    }
    // console.log(updateProduct);
    
    const update = await Product.findByIdAndUpdate(userId, updateProduct).then(() => { 
        res.status(200).send({status: "product updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data ", error: err.message});
    })

})

//delete data from db
router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;

    await Product.findByIdAndDelete(userId).then(() =>{
        res.status(200).send({status: "User deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting user", error: err.message});
    })
})


module.exports=router;