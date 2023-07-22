const router = require("express").Router();

let customer = require ("../models/Addinquiry_models");

// http://localhost:8060/addinquiry/add
router.route("/add").post((req,res)=>{

    const name =req.body.name;
    const id =Number(req.body.id);
    const email =req.body.email;
    const inquiryType =req.body.inquiryType;
    const inquiry=req.body.inquiry;


    const newcustomer = new customer({

        name,id,email,inquiryType,inquiry
    })

    newcustomer.save().then(()=>{

        res.json("Inquiry added")
    }).catch((err)=>{
        console.log(err);


    })

} )


//http:localhost:8060/customer

router.route("/get_customers_AddInquary_details").get((req,res)=>{

    customer.find().then((customer)=>{
            res.json(customer)


    }).catch((err)=>{

        console.log(err)
    })
})




router.route("/update/:id").put(async (req,res)=>{
   let userid = req.params.id;
   const {name,id,email,inquiryType,inquiry}=req.body;

   const updatecustomer ={

    name,
    id,
    email,
    inquiryType,
    inquiry

   }

   const update = await customer.findByIdAndUpdate(userid, updatecustomer)

   .then(()=>{
    res.status(200).send({status: "user update"})


   }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "error with updating data"});


   })

   


})

router.route("/delete/:id").delete(async(req,res)=>{
    let userid = req.params.id;

    await customer.findByIdAndDelete(userid)
    .then(()=>{

     res.status(200).send({status: "user deleted"});


    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"error with delete user",error: err.message});
    })


})

router.route("/").get(async (req,res)=>{
   let userid = req.params.id;
   const user = await customer.findById(userid)
   .then((customer)=>{

    res.status(200).send({status:"user fetched",customer})
   }).catch(()=>{

    console.log(err.message);
    res.status(500).send({status:"error with get user ",error:err.message})
   })

})

module.exports = router;  
