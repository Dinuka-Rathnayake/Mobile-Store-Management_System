import axios from "axios";
import React, {useState} from "react"
import { useNavigate } from "react-router-dom";



// @mui
import {
    Container
  } from '@mui/material';

export default function AddDeliveryGuy(){

    const [name, setName]=useState("");
    const [adress, setAdress]=useState("");
    const [idno, setIdnumber]=useState("");
    const [mobile, setmobileNumber]=useState("");
    const [age, setAge]=useState("");
  

    const navigate = useNavigate();

    function sendData(e){
    
        e.preventDefault();


        const newSupplier ={
            name, adress,idno, mobile, age
        }

        axios.post("http://localhost:8070/deliveryGuys/add",newSupplier).then(()=>{
            alert("Delivery Guy Added")
            navigate(-1);
            
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
    
        <div className="container mt-5" >

        <div className="form-out">
            <h1>Add Delivery Guy</h1>
            

            <form  onSubmit={sendData}>
                <div className="row g-3 ">
                   

                    <div className="col-md-6">
                            <h4>Enter Name</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Enter Name.." onChange={(e)=>{
                                setName(e.target.value);
                            }} />    
                        </div>

                        
                    <div className="col-md-6">
                            <h4>Adress</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Adress.." onChange={(e)=>{
                                setAdress(e.target.value);
                            }} />    
                        </div>

                        
                    <div className="col-md-6">
                            <h4>Delivery Guy ID</h4>  
                            <input type="number" className="form-control" id="code" placeholder="id.." onChange={(e)=>{
                                setIdnumber(e.target.value);
                            }} />    
                        </div>

                        
                    <div className="col-md-6">
                            <h4>Mobile Number</h4>  
                            <input type="number" className="form-control" id="code" placeholder="Mobile Number.." onChange={(e)=>{
                                setmobileNumber(e.target.value);
                            }} />    
                        </div>


                        <div className="col-md-4">
                            <h4>age</h4>
                            <select id="code" className="form-select" onChange={(e) => {
                                setAge(e.target.value);
                            }}>
                                <option selected value="none">select age</option>
                                <option value="none">25</option>
                                <option value="none">30</option>
                                <option value="none">15</option>
                              
                            </select>
                        </div>


                    {/* <div className="col-md-6">
                            <h4>Age</h4>  
                            <input type="number" className="form-control" id="code" placeholder="Age.." onChange={(e)=>{
                                setAge(e.target.value);
                            }} />    
                        </div> */}


                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>




                </div>

            </form>
                
        </div>

    </div>

    
    




    )

}