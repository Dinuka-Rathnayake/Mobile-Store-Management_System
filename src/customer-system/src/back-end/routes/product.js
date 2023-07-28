//1.import packages
const router = require("express").Router()
const {Router} = require("express");
let Product = require("../models/product.js")



//retreive data from db
router.route("/products/getproducts").get((req, res) => {
    Product.find().then((products) =>{
        res.json(products)
    }).catch(() => {
        console.log(err);
    })
})

//test search api
router.get("/search",async(req, res)=>{
    try{
        const query = req.query.q;
        const searchRegex = new RegExp(query, "i");

        const results = await Product.find({
            $or: [{ name: searchRegex}],
            // Add more fields in the $or array if needed for searching other fields
          });
        
          res.json(results);

        // res.status(200).json(response)
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:true,message:"Internal Server Error"});
    }

});



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