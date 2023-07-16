import axios from "axios";
import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';


import './Addsuppliers.css'

// @mui
import {
    Container
  } from '@mui/material';

export default function AddSupplyDetails(){

    const [SupplierId, setSupplierId]=useState("");
    const [Items, setItems]=useState("");
    const [Quentity, setQuentity]=useState("");
    const [DeliveryDate, setDeliveryDate]=useState("");

    const navigate = useNavigate();

    function sendData(e){
    
        e.preventDefault();


        const newSupply ={
            SupplierId, Items, Quentity, DeliveryDate
        }

        axios.post("http://localhost:8070/supplier_deliverydetails/add_supplier_deliverydetails",newSupply).then(()=>{
            alert("Details Added")
            navigate(-1);
            
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div className="container mt-5" >

            <div className="form-out">
                <h1>Adding a new supply</h1>
                

                <form  onSubmit={sendData}>
                    <div className="row g-3 ">

                        <div className="col-md-12">
                            <div className="float-end">
                                <button type="button" className="btn btn-primary " onClick={()=>navigate(-1)}>Supply History</button>
                            </div> <br/>
                        </div>

                        <div className="col-md-6">
                            <h4  className="form-label">Supplier ID</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Create Supplier ID.." onChange={(e)=>{
                                setSupplierId(e.target.value);
                            }} />    
                        </div>

                        <div className="col-md-6">
                            <h4 htmlFor="code" className="form-label">Supply Items</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Enter Supply Items.." onChange={(e)=>{
                                setItems(e.target.value);
                            }} />    
                        </div>
                        
                        

                        <div className="col-md-6">
                            <h4 htmlFor="product_stock" className="form-label">Quentity</h4>
                            <input type="text" className="form-control" id="product_stock" placeholder="Quentity.." onChange={(e) => {
                                setQuentity(e.target.value);
                            }} />
                        </div> 

                        <div className="col-md-6">
                            <h4 htmlFor="product_stock" className="form-label">Date</h4>
                            <input type="date" className="form-control" id="product_stock" placeholder="Deliver Date.." onChange={(e) => {
                                setDeliveryDate(e.target.value);
                            }} />
                        </div>  

                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                        


                    </div>
  
                </form>
                    
            </div>
 
        </div>
    )

}