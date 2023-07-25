import axios from "axios";
import React, {useState} from "react"
import { useNavigate } from "react-router-dom";



// @mui
import {
    Container
  } from '@mui/material';

export default function AddOrder(){

    const [orderId, setId]=useState("");
    const [name, setname]=useState("");
    const [quentity, setquentity]=useState("");
    const [idno, setidnoNumber]=useState("");
    const [adress, setadress]=useState("");
  

    const navigate = useNavigate();

    function sendData(e){
    
        e.preventDefault();


        const newSupplier ={
            orderId, name,quentity, idno, adress
        }

        axios.post("http://localhost:8070/deliveryOrder/add",newSupplier).then(()=>{
            alert("Order Added")
            navigate(-1);
            
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
    
        <div className="container mt-5" >

        <div className="form-out">
            <h1>Add Delivery Order</h1>
            

            <form  onSubmit={sendData}>
                <div className="row g-3 ">

                  
                   

                    <div className="col-md-6">
                            <h4>Enter order ID</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Enter order ID.." onChange={(e)=>{
                                setId(e.target.value);
                            }} />    
                        </div>

                        
                    <div className="col-md-6">
                            <h4>Name</h4>  
                            <input type="text" className="form-control" id="code" placeholder="name.." onChange={(e)=>{
                                setname(e.target.value);
                            }} />    
                        </div>

                        
                    <div className="col-md-6">
                            <h4>Quentity</h4>  
                            <input type="number" className="form-control" id="code" placeholder="quentity" onChange={(e)=>{
                                setquentity(e.target.value);
                            }} />    
                        </div>

                        
                    <div className="col-md-6">
                            <h4>Delivery ID</h4>  
                            <input type="number" className="form-control" id="code" placeholder="id.." onChange={(e)=>{
                                setidnoNumber(e.target.value);
                            }} />    
                        </div>

                        
                    <div className="col-md-6">
                            <h4>Adress</h4>  
                            <input type="text" className="form-control" id="code" placeholder="adress.." onChange={(e)=>{
                                setadress(e.target.value);
                            }} />    
                        </div>


                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Add Order</button>
                        </div>




                </div>

            </form>
                
        </div>

    </div>

    
    




    )

}