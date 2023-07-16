import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function  EditExpenses({selectExpensesId}) {
    
    
    const iD = selectExpensesId;
    console.log("this is edit expense"+iD)
    const[id, setID] = useState(iD);
    const [billID,setBillID]= useState("");
    const [date,setDate]= useState("");
    const [payee,setPayee]= useState("");
    const [amount,setAmount]= useState("");
    const [description,setDescription]= useState("");
    const [newExpense, setNewExpense] = useState([])
    const [newUpdateExpense, setNewUpdateExpense] = useState({})


     //navigate to another path
     const navigate = useNavigate();

     //get current edit details
    useEffect(() => {
        
        axios.get(`http://localhost:8070/expense/get/${id}`).then((res) =>{
            console.log(res.data.expenses)

            setNewExpense(res.data.expenses);
            console.log(setNewExpense)
            setID(id)
            console.log(res.data.expenses.billID)
            const newBillID = res.data.expenses.billID
            console.log(newBillID)
            setBillID(newBillID)

            setDate(res.data.expenses.date)
            setPayee(res.data.expenses.payee)
            setAmount(res.data.expenses.amount) 

            console.log(res.data.expenses.description)
            setDescription(res.data.expenses.description)

        }).catch((err) => {
            alert(err.message);
        })
        
        
    
    },[])



    if (!newExpense) {
        return <div>Loading...</div>;
      }

      //update function
    function updateExpense(e) {
        e.preventDefault();
        const updateExpense = {
            billID, date, payee, amount,description
        }

        //sweetalert
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })




        setNewUpdateExpense(updateExpense);
        if (!newUpdateExpense) {
             return <div>Loading...</div>;
             setNewUpdateExpense(updateExpense);
          }

        console.log(updateExpense)
        
        
         console.log(newUpdateExpense)
        axios.put(`http://localhost:8070/expense/update/${id}`,updateExpense).then((res) => {
            
            console.log(id) ;
            alert("updated");
            navigate(-1);
        }).catch((err) =>{
            alert(err)
        })
    }

    return(
        <div className="container">
            <div class="form-out">
            <h1>Edit Expense</h1>
            {/* <h1>{selectId}</h1> */}
            
            {console.log("this is " + billID)}
            {console.log("this is " + date)}
            {console.log("this is " + payee)}
            {console.log("this is " + amount)}
            {console.log("this is " + description)}

           {/* <h2>{newStudent.name}</h2> */}
            
          
           
            <form onSubmit={updateExpense} >
                
            <div className="mb-3">
                <label for="billID" className="form-label">BillID</label>
                <input type="text" className="form-control" id="billID" placeholder="Enter BillID.." value={billID} onChange={(e)=>{
                    setBillID(e.target.value);
                }} />
                

            </div>
            <div className="mb-3">
                <label for="date" className="form-label">Date</label>
                <input type="date" className="form-control" id="date" placeholder="enter date.." value={date} onChange={(e) => {
                    setDate(e.target.value);
                }} />
            </div>

            <div className="mb-3">
                <label for="Payee" className="form-label">Payee</label>
                <input type="text" className="form-control" id="payee" placeholder="enter payee.." value={payee} onChange={(e) => {
                    setPayee(e.target.value);
                }} />
            </div>

            <div className="mb-3">
                <label for="amount" className="form-label">Amount</label>
                <input type="text" className="form-control" id="amount" placeholder="enter amount.." value={amount} onChange={(e) => {
                    setAmount(e.target.value);
                }} />
            </div>

            <div className="mb-3">
                <label for="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" placeholder="enter description.." value={description} onChange={(e) => {
                    setDescription(e.target.value);
                }} />
            </div>
            



            <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

            {console.log("hii")}
            
        </div>
        </div>
    )
}