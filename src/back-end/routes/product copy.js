//1.import packages
const router = require("express").Router()
const {Router} = require("express");
let Product = require("../models/Product.js")



//retreive data from db
router.route("/products/getproducts").get((req, res) => {
    Product.find().then((products) =>{
        res.json(products)
    }).catch(() => {
        console.log(err);
    })
})

//retreive data from specific id
router.route("/products/ss/:id").get(async(req, res) =>{
    let userId = req.params.id;

    await Product.findById(userId).then((product) => {
        res.status(200).send(product)
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status : "Error with get user", error:err.message}); 
    })
    
})



module.exports=router;