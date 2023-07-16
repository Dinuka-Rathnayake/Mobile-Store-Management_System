import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddEmployee.css';
// import { Helmet } from 'react-helmet-async';
// @mui
import {
    Container
  } from '@mui/material';

export default function AddEmployeePage(){
 
    const [Employee_Name,setName] = useState("")
    const [Email_Address,setEmail] = useState("")
    const [Registation_Date,setRegdate] = useState("")
    const [Phone_no,setPNumber] = useState("")
    const [Employee_id,setEid] = useState("")
    const [Employee_PW,setPassword] = useState("")
    const [Department,setDepartment] = useState("")

    const navigate = useNavigate()

// create a funtion click to submit and call it
     function sendData(e){
        e.preventDefault();
        alert("Inserted");
     
        const newEmployee ={
            Employee_Name,
            Email_Address,
            Registation_Date,
            Phone_no,
            Employee_id,
            Employee_PW,
            Department
        }
        
        axios.post("http://localhost:8070/Employee/adding",newEmployee).then(()=>{
            alert("Employee Added")
        }).catch((error)=>{
            alert(error)
        })
    }


    return( 
        <Container>
        <div className="form-out">

        <div className="col-md-12">
              <div className="float-end">
                  <button type="button" className="btn btn-primary " onClick={()=>navigate(-1)}>Employee List</button>
              </div> <br/>
         </div>

    <form onSubmit={sendData}>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Employee Name</label> */}
        <h5>Employee Name</h5>
        <input type="text" className="form-control" id="Employee_Name"  placeholder="Enter name"
         onChange={(e)=>{setName(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
        <h5>Email address</h5>
        <input type="text" className="form-control" id="Email_Address"  placeholder="Enter email" 
        onChange={(e)=>{setEmail(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Registation Date</label> */}
        <h5>Registation Date</h5>
        <input type="Date" className="form-control" id="Registation_Date"  placeholder="Enter regdate"
         onChange={(e)=>{setRegdate(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Phone number</label> */}
        <h5>Phone number</h5>
        <input type="number" className="form-control" id="Phone_no"  placeholder="Enter pNumber"
        
        onChange={(e)=>{setPNumber(e.target.value)}}/>
    </div>

     <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Phone number</label> */}
        <h5>Employee ID</h5>
        <input type="text" className="form-control" id="Employee_id"  placeholder="Enter eid"
        
        onChange={(e)=>{setEid(e.target.value)}}/>
    </div>

    

    <div className="form-group">
         {/* <label htmlFor="exampleInputPassword1">Employee_PW</label> */}
         <h5>Employee_PW</h5>
         <input type="text" className="form-control" id="Employee_PW" placeholder="Password" 
         onChange={(e)=>{setPassword(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Department</label> */}
        <h5>Department</h5>
        <input type="text" className="form-control" id="Department"  placeholder="Enter Department" 
        onChange={(e)=>{setDepartment(e.target.value)}}/>
    </div>
 
    <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
    </div>
</Container>
    )

}