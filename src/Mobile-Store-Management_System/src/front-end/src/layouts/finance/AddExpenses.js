import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Finance.css';
import Swal from 'sweetalert2';


export default function AddExpenses(){

  const [billID,setBillID]= useState("");
  const [date,setDate]= useState("");
  const [payee,setPayee]= useState("");
  const [amount,setAmount]= useState("");
  const [description,setDescription]= useState("");
  const[error,setError]=useState(false)


   //navigate to another path
   const navigate = useNavigate();

  function sentData(e){
    
    e.preventDefault();
    //validate
    if(billID.length==0||date.length==0||payee.length==0||amount.length==0||description.length==0){
      setError(true)
    }
    if(billID&&date&&payee&&amount&&description)
    {
    console.log("BILL ID: ",billID,"\n DATE: ",date,"")
    
    

    //console.log(billID,payee)
   //alert("Insert");

   //sweetalert
   Swal.fire(
    'Good job!',
    'Save All Details!',
    'success'
  )


   const newExpense={
    
  
    billID,
    date,
    payee,
    amount,
    description
   }

   axios.post("http://localhost:8070/expense/add",newExpense).then(()=>{
      alert("Expense Added");
      navigate(-1);

      setBillID("");
      setDate("");
      setPayee("");
      setAmount("");
      setDescription("");




     }).catch((err)=>{
      alert(err)
     })

    }

   console.log(newExpense);
  }

    return(
<div className="container" >
<div class="form-out">
    <h2>Add Expenses</h2>
     <form  onSubmit={sentData}>
  

  <div className="form-group">
    <label for="BillID" className="form-label">BillID</label>
    <input type="text" className="form-control" id="BillID" placeholder="BillID"
    
    onChange={(e)=>{
      setBillID(e.target.value)
   }}
   
    />
  </div>
  {error&&billID.length<=0?
  <label className="form-error">Bill ID can't be Empty!</label>:""}
  <div className="form-group">
    <label for="exampleInputDate" className="form-label">Date</label>
    <input type="date" className="form-control" id="exampleInputDate" placeholder=""
    
    onChange={(e)=>{
      setDate(e.target.value)
   }}
   
    />
  </div>
  {error&&date.length<=0?
  <label className="form-error">Date can't be Empty!</label>:""}
  <div className="form-group">
    <label for="exampleInputPayee" className="form-label">Payee</label>
    <input type="text" className="form-control" id="exampleInputPayee" placeholder="Enter payee Name"
    
    onChange={(e)=>{
      setPayee(e.target.value)
   }}
   
    
    />
  </div>
  {error?
  <label className="form-error">Payee can't be Empty!</label>:""}
  <div className="form-group">
    <label for="exampleInputAmount" className="form-label">Amount</label>
    <input type="text" className="form-control" id="exampleInputAmount" placeholder="Enter amount"
    
    onChange={(e)=>{
      setAmount(e.target.value)
   }}
   
    />
  </div>
  {error?
  <label className="form-error">Amount can't be Empty!</label>:""}
  <div className="form-group">
    <label for="exampleInputDescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="exampleInputDescription" placeholder=" Enter description"
    
    onChange={(e)=>{
      setDescription(e.target.value)
   }}
   
    />
  </div>
  {error?
  <label className="form-error">Description can't be Empty!</label>:""}
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


        </div>
        </div>
    )
}