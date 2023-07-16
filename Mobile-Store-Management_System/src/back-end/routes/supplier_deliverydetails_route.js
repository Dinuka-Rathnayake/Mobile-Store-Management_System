const router = require("express").Router()
let supplier_deliverydetails = require("../models/supplier_deliverydetails_model")

//add data
router.route("/add_supplier_deliverydetails").post((req,res)=>{

    const SupplierId = req.body.SupplierId
    const DeliveryDate = req.body.DeliveryDate
    const Quentity = req.body.Quentity
    const Items = req.body.Items

    const supplier_deliverydetails1 = new supplier_deliverydetails({

        SupplierId, DeliveryDate, Quentity, Items
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
router.route("/update_supplier_deliverydetails/:SupplierId").put(async(req,res)=>{
    
    let supplierId =req.params.SupplierId
    const {SupplierId, DeliveryDate, Quentity, ItemTypes} = req.body

    const updateSupplierDeliverydetails = {
        SupplierId, DeliveryDate, quentity, ItemTypes
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
router.route("/delete_supplier_deliverydetails/:SupplierId").delete(async(req,res)=>{
   
    let supplierId =req.params.SupplierId
    await supplier_deliverydetails.findByIdAndDelete(supplierId)
    .then(() =>{
        res.status(200).send({status: "deleted supplier deliverydetails"})
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({status: "error with delete details",error: err.message})
    })
})

//geting one delivery details only
router.route("/get_supplier_deliverydetails/:SupplierId").get(async (req,res)=>{
    
    let userId =req.params.SupplierId
    const user = await supplier_deliverydetails.findById(userId)
    .then((supplier_deliverydetails) => {
        res.status(200).send({status: "supplier delivery details",supplier_deliverydetails})
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status: "error with get delivery details",error: err.message})
    })
})


module.exports=router