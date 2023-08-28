//1.import packages
const router = require("express").Router();
const { Router } = require("express");
let Product = require("../models/product.js");

//retreive data from db
router.route("/products/getproducts").get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch(() => {
      console.log(err);
    });
});

//get search api
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const searchRegex = new RegExp(query, "i");

    const results = await Product.find({
      $or: [{ name: searchRegex }],
      // Add more fields in the $or array if needed for searching other fields
    });

    res.json(results);

    // res.status(200).json(response)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

//get category click search
router.get("/categorySort", async (req, res) => {
  try {
    const query1 = req.query.p;
    const query2 = req.query.q;

    const mainCategorysearchRegex = new RegExp(query1, "i");
    const SubCategorysearchRegex = new RegExp(query2, "i");

    const results = await Product.find({
      $and: [
        { mainCategory: mainCategorysearchRegex },
        { subCategory: SubCategorysearchRegex },
      ],
      // Add more fields in the $or array if needed for searching other fields
    });

    res.json(results);

    // res.status(200).json(response)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

//retreive data from specific id
router.route("/products/ss/:id").get(async (req, res) => {
  let userId = req.params.id;

  await Product.findById(userId)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
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


module.exports = router;
