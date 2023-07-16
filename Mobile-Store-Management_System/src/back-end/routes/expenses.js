const router = require("express").Router();
const { Router } = require("express");
//import Income model
let Expenses = require("../models/Expenses");

//request get values from from frontend to backend
//http//localhost:8070/Expenses/add
// data insert 
router.route("/add").post((req,res)=>{

    const billID = req.body.billID;
    const date = req.body.date;
    const payee = req.body.payee;
    const amount = Number(req.body.amount);
    const  description= req.body.description;

    
    const newExpense = new Expenses({
        billID,
        date,
        payee,
        amount,
        description

    })
 //save object  data in the database
    newExpense.save().then(()=>{

        res.json("Expense Added")
    }).catch((err)=>{
        console.log(err);
    })

})
// data read
//http//localhost:8070/Expenses
router.route("/").get((req,res)=>{
    const q = req.query.r;
    console.log("q is : "+ q)

    Expenses.find().then((expenses)=>{
        res.json(expenses)
    }).catch((err)=>{
        console.log(err)
    })
         
})
//update data
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {billID,date,payee,amount,description}= req.body;

    const updateExpense ={
        billID,
        date,
        payee,
        amount ,
        description
    }
    const update = await Expenses.findByIdAndUpdate(userId,updateExpense)
    .then(()=>{
        res.status(200).send({status:"User updated"});
    }).catch((err)=>{
        res.status(500).send({status:"Error with updating data",error: err.message});
    })  
})
//delete data

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
  
    await Expenses.findByIdAndDelete(userId).then(()=>{
      res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status:"Error with delete user",error:err.message});
    })
  })

  //get one expense data
  router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await Expenses .findById(userId)
    .then((expenses)=>{
        res.status(200).send({stats:"User fetched",expenses})
    }).catch(()=>{
        console.log(err.message);
        req.status(500).send({status:"Error with get user",error: err.message});
    })
})
module.exports = router;