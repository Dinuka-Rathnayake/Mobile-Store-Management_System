const router = require("express").Router();
const { Router } = require("express");
//import Income model
//  let Incomes = require("../models/Incomes");
let Incomes = require('../models/Incomes')


//request get values from from frontend to backend
//http//localhost:8070/income/add
router.route("/add").post((req,res)=>{

    const billID = req.body.billID;
    const date = req.body.date;
    const payee = req.body.payee;
    const amount = Number(req.body.amount);
    const  description= req.body.description;
   

    
    const newIncome = new Incomes({
         billID,
         date,
         payee,
         amount,
         description

    })
 //save object  data in the database
    newIncome.save().then(()=>{

        res.json("Income Added")
    }).catch((err)=>{
        console.log(err);
    })

})
// data read
//http//localhost:8070/income
router.route("/").get((req,res)=>{
    Incomes.find().then((incomes)=>{
        res.json(incomes)
    }).catch((err)=>{
        console.log(err)
    })
         
})
//update data
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {billID,date,payee,amount,description}= req.body;

    const updateIncome ={
      billID,
      date,
      payee,
      amount ,
      description
    }
    const update = await Incomes.findByIdAndUpdate(userId,updateIncome)
    .then(()=>{
        res.status(200).send({status:"User updated"});
    }).catch((err)=>{
        res.status(500).send({status:"Error with updating data",error: err.message});
    })  
})

//delete data

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
  
    await Incomes.findByIdAndDelete(userId).then(()=>{
      res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status:"Error with delete user",error:err.message});
    })
  })

  //get one income data
  router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await  Incomes .findById(userId)
    .then((incomes)=>{
        res.status(200).send({stats:"User fetched",incomes})
    }).catch(()=>{
        console.log(err.message);
        req.status(500).send({status:"Error with get user",error: err.message});
    })
})

module.exports = router;