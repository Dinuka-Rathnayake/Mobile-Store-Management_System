import axios from "axios";
import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import './Addsuppliers.css'

// @mui
import {
    Container
  } from '@mui/material';

export default function AddSuppliers(){

    const [SupplierId, setSupplierId]=useState("");
    const [SupplierName, setSupplierName]=useState("");
    const [Email, setEmail]=useState("");
    const [PhoneNumber, setPhoneNumber]=useState("");
    const [SupplierAddress, setSupplierAddress]=useState("");
    const [ItemType1, setItemType1]=useState("");
    const [ItemType2, setItemType2]=useState("");
    const [ItemType3, setItemType3]=useState("");

    const navigate = useNavigate();

    function sendData(e){
    
        e.preventDefault();


        const newSupplier ={
            SupplierId, SupplierName/* , Password  */,Email, PhoneNumber, SupplierAddress, ItemType1, ItemType2, ItemType3
        }

        axios.post("http://localhost:8070/supplier_details/add_supplier_details",newSupplier).then(()=>{
            alert("Student Added")
            navigate(-1);
            
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div className="container mt-5" >
            <div className="form-out">
                <h1>Add new Supplier</h1>
                

                <form  onSubmit={sendData}>
                    <div className="row g-3 ">

                        <div className="col-md-12">
                            <div className="float-end">
                                <button type="button" className="btn btn-primary " onClick={()=>navigate(-1)}>All Suppliers</button>
                            </div> <br/>
                        </div>

                        <div className="col-md-6">
                            <h4 htmlFor="code" className="form-label">Supplier ID</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Create Supplier ID.." onChange={(e)=>{
                                setSupplierId(e.target.value);
                            }} />    
                        </div>

                        <div className="col-md-6">
                            <h4 htmlFor="code" className="form-label">Supplier Name</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Enter Supplier Name.." onChange={(e)=>{
                                setSupplierName(e.target.value);
                            }} />    
                        </div>
                        
                        

                        <div className="col-md-6">
                            <h4 htmlFor="product_stock" className="form-label">Email</h4>
                            <input type="email" className="form-control" id="product_stock" placeholder="Enter Supplier Email.." onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        </div> 

                        <div className="col-md-6">
                            <h4 htmlFor="product_weight" className="form-label">Phone Number</h4>
                            <input type="number" className="form-control" id="product_weight" placeholder="Enter Supplier Phone Number.." onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }} />
                        </div> 

                        <div className="col-md-12">
                            <h4 htmlFor="productMaincategory" className="form-label">Address</h4>
                            <select id = "productMaincategory" className="form-select" onChange={(e) => {
                                setSupplierAddress(e.target.value);
                            }} >
                            <option selected value="none">--select distric--</option>
                            <option value="galle">Galle</option>
                            <option value="galle">Malabe</option>
                            <option value="galle">Kaduwela</option>
                            <option value="galle">Kottawa</option>
                            </select>
                        </div> 

                        

                         

                        <div className="col-md-4">
                            <h4 htmlFor="productSubcategory1" className="form-label">Product Category 1</h4>
                            <select id="productSubcategory1" className="form-select" onChange={(e) => {
                                setItemType1(e.target.value);
                            }}>
                                <option selected value="none">--select category--</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="other">other</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <h4 htmlFor="productSubcategory1" className="form-label">Product Category 2</h4>
                            <select id="productSubcategory1" className="form-select" onChange={(e) => {
                                setItemType2(e.target.value);
                            }}>
                                <option selected value="none">--select category--</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="other">other</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <h4 htmlFor="productSubcategory1" className="form-label">Product Category 3</h4>
                            <select id="productSubcategory1" className="form-select" onChange={(e) => {
                                setItemType3(e.target.value);
                            }}>
                                <option selected value="none">--select category--</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="other">other</option>
                            </select>
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