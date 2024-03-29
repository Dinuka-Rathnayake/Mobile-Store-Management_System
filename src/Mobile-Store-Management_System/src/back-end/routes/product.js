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
});

//retreive data from db
router.route("/").get((req, res) => {
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


//pagination
router.route("/paginatedUsers").get(async(req, res) => {
   
        
        const allUsers = await Product.find({}) ;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        console.log("hii dinuka")
        
        
        const startIndex = (page -1) * limit;
        const lastIndex = (page) * limit;

       
        const results = {}
        results.totalUsers = allUsers.length
        results.pageCount = Math.ceil(allUsers.length/limit)

        if(lastIndex  < allUsers.length)
        results.next = {
            page: page +1,
            
        } 
        if(lastIndex > 0){
            results.prev = {
                page:page - 1,
            }
        }
        
        
        results.result = allUsers.slice(startIndex, lastIndex) 
        res.json(results)
    
})


module.exports=router;