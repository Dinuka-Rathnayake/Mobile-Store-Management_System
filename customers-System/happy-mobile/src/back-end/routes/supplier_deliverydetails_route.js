const router = require("express").Router()
let supplier_deliverydetails = require("../models/supplier_deliverydetails_model")

//add data
router.route("/add_supplier_deliverydetails").post((req,res)=>{

    const User_Id = req.body.User_Id
    const Delivery_Date = Number(req.body.Delivery_Date)
    const quentity = req.body.quentity
    const Item_Types = req.body.Item_Types

    const supplier_deliverydetails1 = new supplier_deliverydetails({

        User_Id, Delivery_Date, quentity, Item_Types
   })

   supplier_deliverydetails1.save().then(()=>{

        res.json("supplier delivery details added")
   }).catch((err)=>{
        console.log(err)
   })

})


//Read data
router.route("/get_supplier_deliverydetails").get((req,res)=>{

    supplier_deliverydetails.find().then((supplier_deliverydetails_model)=>{
        res.json(supplier_deliverydetails_model)
    }).catch((err)=>{
        res.json(err)
    })
})


//Update data
router.route("/update_supplier_deliverydetails/:User_Id").put(async(req,res)=>{
    
    let supplierId =req.params.User_Id
    const {User_Id, Delivery_Date, quentity, Item_Types} = req.body

    const updateSupplierDeliverydetails = {
        User_Id, Delivery_Date, quentity, Item_Types
    }

    const update = await supplier_deliverydetails.findByIdAndUpdate(supplierId,updateSupplierDeliverydetails)
    .then(()=>{
        res.status(200).send({status: "updated supplier deliverydetails"})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "error with updating data",error:err.message})
    })

    
})


//delete data
router.route("/delete_supplier_deliverydetails/:User_Id").delete(async(req,res)=>{
   
    let supplierId =req.params.User_Id
    await supplier_deliverydetails.findByIdAndDelete(supplierId)
    .then(() =>{
        res.status(200).send({status: "deleted supplier deliverydetails"})
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({status: "error with delete details",error: err.message})
    })
})

//geting one delivery details only
router.route("/get_supplier_deliverydetails/:User_Id").get(async (req,res)=>{
    
    let userId =req.params.User_Id
    const user = await supplier_deliverydetails.findById(userId)
    .then((supplier_deliverydetails) => {
        res.status(200).send({status: "supplier delivery details",supplier_deliverydetails})
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status: "error with get delivery details",error: err.message})
    })
})


module.exports=router