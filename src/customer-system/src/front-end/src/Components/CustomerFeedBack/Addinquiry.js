import axios from "axios";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import './CustomerInquiry.css'



export default function Addinquiry(){

    const [name, setname]=useState("");
    const [id, setid]=useState("");
    const [email, setemail]=useState("");
    const [inquiryType, setinquirytype]=useState("");
    const [inquiry, setinquiry]=useState("");
    const navigate = useNavigate();

    function sendData(e){
    
        e.preventDefault();


        const newSupplier ={
            name, id, email, inquiryType, inquiry
        }

        axios.post("http://localhost:8070/addinquiry/add",newSupplier).then(()=>{
            alert("Added")
            navigate();
            
        }).catch((err)=>{
            alert(err)
        })
    }






    return(
        <div className="container mt-5" >
            <div className="form-out">
                <h1>Add customer inquiry </h1>
                

                <div className="float-end">
       <button type="button" className="btn btn-primary " onClick={()=>navigate("/inquire/viewCustomerInquiry")}>View Aded Inquiry</button> <span/>
      
       </div>


                <form  onSubmit={sendData}>
                    <div className="row g-3 ">

                       {/*  <div className="col-md-12">
                            <div className="float-end">
                                <button type="button" className="btn btn-primary " onClick={()=>navigate(-1)}>All Suppliers</button>
                            </div> <br/>
                        </div> */}

                        <div className="col-md-6">
                            <h4 htmlFor="code" className="form-label">Customer Name</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Enter customer ID.." onChange={(e)=>{
                                setname(e.target.value);
                            }} />    
                        </div>

                        <div className="col-md-6">
                            <h4 htmlFor="code" className="form-label">product Id</h4>  
                            <input type="number" className="form-control" id="code" placeholder="Enter customer  Name.." onChange={(e)=>{
                                setid(e.target.value);
                            }} />    
                        </div>
                        
                        

                        <div className="col-md-6">
                            <h4 htmlFor="product_stock" className="form-label">Customer Email</h4>
                            <input type="email" className="form-control" id="product_stock" placeholder="Enter customer Email.." onChange={(e) => {
                                setemail(e.target.value);
                            }} />
                        </div> 

                        <div className="col-md-4">
                            <h4 htmlFor="productSubcategory1" className="form-label">inquiry Type </h4>
                            <select id="productSubcategory1" className="form-select" onChange={(e)=>{
                                setinquirytype(e.target.value);
                                
                            }}>
                                <option selected value="none">--select category--</option>
                                <option value="warranty">warranty</option>
                                <option value="software">software</option>
                                <option value="hardware">hardware</option>
                                <option value="other">other</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <h4 htmlFor="productMaincategory" className="form-label">Inquiry message </h4>
                            <input type="text" className="form-control" id="product_weight" placeholder="Enter responding message.." onChange={(e) => {
                                setinquiry(e.target.value);
                            }} />
                        </div> 

                        
                        
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>


                    </div>
  
                </form>
                    
            </div>
 
        </div>
    )

}