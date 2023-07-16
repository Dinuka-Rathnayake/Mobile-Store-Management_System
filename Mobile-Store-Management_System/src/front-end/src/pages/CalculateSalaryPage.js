import React, { useState } from "react";
import axios from "axios";
import './AddEmployee.css';
import { Helmet } from 'react-helmet-async';
import './CalculateSalaryPage.css'
import {
    Container
  } from '@mui/material';

export default function CalculateSalaryPage(){
    const [Employeeid,setEid] = useState("")
    const [RatePerHour,setRatePerHour] = useState("")
    const [HourPerDay,setHourPerDay] = useState("")
    const [NumberOfWokingDays,setNumberOfWokingDays] = useState("")
    const [GrossSalary,setGrossSalary] = useState("")
    const [Deduction,setDeduction] = useState("")
    const [NetSalary,setNetSalary] = useState("")


// create a funtion click to submit and call it
     function sendData(e){
        e.preventDefault();
        alert("Inserted");
     
        const newSalary ={
            Employeeid,
            RatePerHour,
            HourPerDay,
            NumberOfWokingDays,
            GrossSalary,
            Deduction,
            NetSalary,
           
        }
        
        axios.post("http://localhost:8070/Salary/adding",newSalary).then(()=>{
            alert("Salary Added")
        }).catch((error)=>{
            alert(error)
        })
    }


    return( 
        <Container>
         <div className="form-out">
    <form onSubmit={sendData}>
            <div>
            <Container>
            <h1>Salary Calculation </h1>
            </Container>
            
    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Employee Name</label> */}
        <h5>Employee ID</h5>
        <input type="text" className="form-control" id="Employeeid"  placeholder="Enter Employee id"
         onChange={(e)=>{setEid(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Employee Name</label> */}
        <h5>Rate per hour</h5>
        <input type="text" className="form-control" id="RatePerHour"  placeholder="Enter rate per hour"
         onChange={(e)=>{setRatePerHour(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
        <h5>Hour per day</h5>
        <input type="text" className="form-control" id="HourPerDay"  placeholder="Enter hour per day" 
        onChange={(e)=>{setHourPerDay(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Registation Date</label> */}
        <h5>Number of woking days</h5>
        <input type="text" className="form-control" id="NumberOfWokingDays"  placeholder="Enter number of woking days"
         onChange={(e)=>{setNumberOfWokingDays(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1">Phone number</label> */}
        <h5>Gross Salary</h5>
        <input type="text" className="form-control" id="GrossSalary"  placeholder="Enter GrossSalary"
        
        onChange={(e)=>{setGrossSalary(e.target.value)}}/>
    </div>

    <div className="form-group">
        {/* <label htmlFor="exampleInputEmail1"> Employee ID</label> */}
        <h5>Deduction</h5>
        <input type="text" className="form-control" id="Deduction"  placeholder="Enter Deduction" 
        onChange={(e)=>{setDeduction(e.target.value)}}/>
    </div>

    <div className="form-group">
        
         {/* <label htmlFor="exampleInputPassword1">Employee_PW</label> */}
         <h5>Net Salary</h5>
         <input type="text" className="form-control" id="NetSalary" placeholder="Enter net Salary" 
         onChange={(e)=>{setNetSalary(e.target.value)}}/>
         
    </div>
 
    <button type="submit"  className="btn btn-primary">Submit</button>
    </div>
    </form>
    </div>
</Container>
    )

}