const router = require("express").Router();
const { request } = require("express");
let delivery = require("../models/order");



//Create

router.route("/add").post((req,res)=>{

    const orderId = req.body.orderId;
    const name = req.body.name;
    const quentity = Number(req.body.quentity);
    const idno = Number(req.body.idno) ;
    const adress = req.body.adress;

    const newDeliveryguys = new delivery({

        orderId,
        name,
        quentity,
        idno,
        adress
    })
   newDeliveryguys.save().then(()=>{
    res.json("Delivery Guy Added")
   }).catch((err)=>{
    console.log(err);
   })

})

//Display

router.route("/display").get((req,res)=>{

  delivery.find().then((delivery)=>{

    res.json(delivery)

  }).catch((err)=>{
    console.log(err)
  })    


})


//Update

router.route ("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    const {orderId,name,quentity,idno,adress} = req.body;

    const updateDeliveryguys = {
        orderId,
        name,
        quentity,
        idno,
        adress
    }
    const update = await delivery.findByIdAndUpdate(userID,updateDeliveryguys).then((delivery)=>{
        res.json(delivery)
    }).catch((err)=>{
        consol.log(err);
        res.json("Error with updating data");


    })

})

//Delete

router.route ("/delete/:id").delete(async(req,res)=>{
    let userID = req.params.id;

    await delivery.findByIdAndDelete(userID).then(()=>{
        res.json("User Deleted");


        }).catch((err)=>{
            consol.log(err);
            res.json("Error with delete user");

    })


})


//Get one user Details

router.route ("/get/:id").get(async(req,res)=>{
    let userID = req.params.id;

    await delivery.findById(userID).then(()=>{

        res.json("User fetched");


    }).catch((err)=>{
        consol.log(err);
        res.json("Error with Get User")

    })


})









module.exports = router;