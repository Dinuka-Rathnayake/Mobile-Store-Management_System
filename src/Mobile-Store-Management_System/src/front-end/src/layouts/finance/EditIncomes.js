import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
export default function  EditIncomes({selectId}) {
    
    
    const iD = selectId;
    console.log("this is edit income"+iD)
    const[id, setID] = useState(iD);
    const [billID,setBillID]= useState("");
    const [date,setDate]= useState("");
    const [payee,setPayee]= useState("");
    const [amount,setAmount]= useState("");
    const [description,setDescription]= useState("");
    const [newIncome, setNewIncome] = useState([])
    const [newUpdateIncome, setNewUpdateIncome] = useState({})
   // const[error,setError]=useState(false)


     //navigate to another path
     const navigate = useNavigate();

     //get current edit details
    useEffect(() => {
        
        axios.get(`http://localhost:8070/income/get/${id}`).then((res) =>{
            console.log(res.data.incomes)

            setNewIncome(res.data.incomes);
            console.log(setNewIncome)
            setID(id)
            console.log(res.data.incomes.billID)
            const newBillID = res.data.incomes.billID
            console.log(newBillID)
            setBillID(newBillID)

            setDate(res.data.incomes.date)
            setPayee(res.data.incomes.payee)
            setAmount(res.data.incomes.amount) 

            console.log(res.data.incomes.description)
            setDescription(res.data.incomes.description)

        }).catch((err) => {
            alert(err.message);
        })
        
        
    
    },[])



    if (!newIncome) {
        return <div>Loading...</div>;
      }

      //update function
    function updateIncome(e) {
        e.preventDefault();
        const updateIncome = {
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


          
        //
        // if(billID.length==0||date.length==0||payee.length==0||amount.length==0||discription.length==0){
        //     setError(true)
        //   }
        //   console.log(billID,payee)

        //
        setNewUpdateIncome(updateIncome);
        if (!newUpdateIncome) {
             return <div>Loading...</div>;
             setNewUpdateIncome(updateIncome);
          }

        console.log(updateIncome)
        
        
         console.log(newUpdateIncome)
        axios.put(`http://localhost:8070/income/update/${id}`,updateIncome).then((res) => {
            
            console.log(id) ;
           // alert("updated");
            navigate(-1);
        }).catch((err) =>{
            alert(err)
        })
    }

    return(
        <div className="container">
            <div class="form-out">
            <h2>Edit Income</h2>
            {/* <h1>{selectId}</h1> */}
            
            {console.log("this is " + billID)}
            {console.log("this is " + date)}
            {console.log("this is " + payee)}
            {console.log("this is " + amount)}
            {console.log("this is " + description)}

           {/* <h2>{newStudent.name}</h2> */}
            
          
           
            <form onSubmit={updateIncome} >
                
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