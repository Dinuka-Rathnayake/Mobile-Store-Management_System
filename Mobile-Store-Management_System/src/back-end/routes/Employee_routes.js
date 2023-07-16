//const router = require("express").Router();
const express = require("express")
const router = express.Router()
const {Employee} = require("../models/employee_model");


//http://localhost:8070/Employee/adding
//add
router.route("/adding").post(async(req,res)=>{
    try {
        
        const Employee_Name = req.body.Employee_Name;
        const Email_Address = req.body.Email_Address;
        const Registation_Date = req.body.Registation_Date;
        const Phone_no = Number(req.body.Phone_no);
        const Employee_id = req.body.Employee_id;
        const Employee_PW = req.body.Employee_PW;
        const Department = req.body.Department;


        const test = await Employee.create({
            Employee_Name,
            Email_Address,
            Registation_Date,
            Phone_no,
            Employee_id,
            Employee_PW,
            Department
        })

        return res.status(200).json({
            status: '200',
            data:test,
            message: 'Success',
          });

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: '500',
            data:null,
            message: 'Something went wrong, please try again later',
          });
    }


})

//http://localhost:8070/Employee

//display
router.route("/").get((req,res)=>{
    Employee.find().then((employee)=>{
        res.json(employee)
    }).catch((err)=>{
       res.json(err)
    })
})

//http://localhost:8070/Employee/update/0001


//update
router.route("/update/:id").put(async(req,res)=>{
    let userid = req.params.id;
    const {Employee_Name,
        Email_Address,
        Registation_Date,
        Phone_no,
        Employee_id,
        Employee_PW,
        Department} = req.body;

    const updateEmployee = {
        Employee_Name,
        Email_Address,
        Registation_Date,
        Phone_no,
        Employee_id,
        Employee_PW,
        Department
    }

    const update = await Employee.findByIdAndUpdate(userid,updateEmployee)
    .then(()=>{
        res.status(200).send({status:"user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error: err.message});
    }) 
})
//delete
router.route("/delete/:id").delete(async(req,res)=>{
   let userid = req.params.id;
   
   await Employee.findByIdAndDelete(userid)
   .then(()=>{
        res.status(200).send({status: "user deleted"});
   }).catch((err)=>{
    console.log(err.massage);
    res.status(500).send({status: "Error with delete user", error: err.message});
   })
})



router.route("/get/:id").get(async(req,res)=>{
    let userid = req.params.id;
    const user = await Employee.findById(userid)
    .then((employee)=>{
        res.status(200).send({statusbar: "user fetched"})
    }).catch(()=>{console.log(err.message);
        res.status(500).send({status: "Error with get user",error: err.message});

    })
})

module.exports=router