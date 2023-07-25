const router = require("express").Router()
let supplier_details = require("../models/supplier_details_model")

//add data
router.route("/add_supplier_details").post((req,res)=>{

    const SupplierId = req.body.SupplierId
    const SupplierName = req.body.SupplierName
    /* const Password = req.body.Password */
    const Email = req.body.Email
    const PhoneNumber = Number(req.body.PhoneNumber)
    const SupplierAddress = req.body.SupplierAddress
    const ItemType1 = req.body.ItemType1
    const ItemType2 = req.body.ItemType2
    const ItemType3 = req.body.ItemType3

    const supplier_deliverydetails1 = new supplier_details({

        SupplierId, SupplierName, /* Password , */Email, PhoneNumber, SupplierAddress, ItemType1, ItemType2, ItemType3 
   })

   supplier_deliverydetails1.save().then(()=>{

        res.json("supplier_details_added")
   }).catch((err)=>{
        console.log(err)
   })

})


//Read data
router.route("/get_supplier_details").get((req,res)=>{
    supplier_details.find().then((supplier_details_model)=>{
        res.json(supplier_details_model)
    }).catch((err)=>{
        res.json(err)
    })
})


//Update data
router.route("/update_supplier_details/:id").put(async(req,res)=>{
    
    let supplierId =req.params.id
    const {SupplierId, SupplierName, Password,Email, PhoneNumber, SupplierAddress, ItemType1,ItemType2,ItemType3} = req.body

    const updateSupplierDetails = {
        SupplierId, SupplierName, Password,Email, PhoneNumber, SupplierAddress, ItemType1,ItemType2,ItemType3
    }

    const update = await supplier_details.findByIdAndUpdate(supplierId,updateSupplierDetails)
    .then(()=>{
        res.status(200).send({status: "updated supplier details"})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "error with updating data",error:err.message})
    })

    
})


//delete data
router.route("/delete_supplier_details/:User_Id").delete(async(req,res)=>{
   
    let supplierId =req.params.User_Id
    await supplier_details.findByIdAndDelete(supplierId)
    .then(() =>{
        res.status(200).send({status: "deleted supplier details"})
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({status: "error with delete details",error: err.message})
    })
})

//geting one details only
router.route("/get_supplier_details/:User_Id").get(async (req,res)=>{
    
    let supplierId =req.params.User_Id
    const user = await supplier_details.findById(supplierId)
    .then((supplier_details) => {
        res.status(200).send({status: "supplier details",supplier_details})
    }).catch(()=>{
        console.log(err.message)
        res.status(500).send({status: "error with get details",error: err.message})
    })
})


module.exports=router