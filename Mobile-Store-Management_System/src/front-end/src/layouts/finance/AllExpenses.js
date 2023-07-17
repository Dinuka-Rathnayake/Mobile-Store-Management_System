import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";



 export default function AllExpenses({setExpensesId}){

    const  [expenses, setExpenses]=useState([]);
    const [query, setQuery] = useState("");

    console.log("this is search query : "+query);
 
    useEffect(()=>{
        function getExpenses(){
          axios.get(`http://localhost:8070/expense/`).then((res)=>{
            //console.log(res.data);
            setExpenses(res.data);
          }).catch((err)=>{
            alert(err.message);
          })   
        }
        getExpenses();

    },[query])

     //delete Expense
     function deleteRow(id, e){
        e.preventDefault();

        axios.delete(`http://localhost:8070/expense/delete/${id}`).then(res => 
            console.log('Deleted!!!', res)).catch(err => console.log(err))

            // reload page after delete
            window.location.reload(true);
        
    }

    //navigate to EditExpense component
    let navigate = useNavigate();
    const routeChange = (id, e) =>{
       // ID = id;
       setExpensesId(id);
        console.log(id)
        alert(id);
        let path = "edit"
        navigate(path)

    }

        //export to pdf
        const exportPDF = () => {
            
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape
        
            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);
        
            doc.setFontSize(15);
        
            const title = "My Awesome Report";
            const headers = [["Bill Id", "Date","Payee","Amount","Discription"]];
    
            const data = expenses.map(elt=> [elt.billID, elt.date,elt.payee,elt.amount,elt.description]);
    
            let content = {
                startY: 50,
                head: headers,
                body: data
              };
          
              doc.text(title, marginLeft, 40);
              doc.autoTable(content);
              doc.save("report.pdf")
    
    
        }
  

    return(
        <div className="container">
          <div class="form-out">
       <h2>All Expenses</h2>
       <div className="row g-3 ">
            <div className="col-md-8">
                <button className="btn btn-primary" onClick={()=> navigate("add")}>Add New</button><span> </span>
                <button type="button" className="btn btn-primary" onClick={() => exportPDF()}>Generate Report</button>
                
            </div>
            
            <div className="col-md-4">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setQuery(
                        e.target.value
                    )}/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>

       </div>

       <table className="table table-cart table-mobile" style={{fontSize : "32px"}} >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Payee</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map(post => ( 
                            // <p key={post._id}>{post.billID}</p>

                            <tr style={{fontSize : "20px"}}>
                                <th className="row">
                                    <p key={post._id}>{post.billID}</p>
                                </th>

                                <td className="col">
                                    <p key={post._id}>{post.date}</p>
                                </td>

                                <td className="col">
                                    <p key={post._id}>{post.payee}</p>
                                </td>

                                <td className="col">
                                    <p key={post._id}>{post.amount}</p>
                                </td>

                                <td className="col">
                                    <p key={post._id}>{post.description}</p>
                                </td>

                                <td className="col">
                                <p key={post._id}>
                                        <button type="button" class="btn btn-primary" onClick={(e) => routeChange(post._id, e)} style={{fontSize : "16px"}} >Edit</button>
                                        
                                        <span>   </span>
                                        <button type="button" class="btn btn-danger"  onClick={(e) => deleteRow(post._id, e)} >Delete</button>   
                                    </p>     
                                </td>


                            </tr>
                            
                        ))}     
                    </tbody>    
                </table>














       {/* <table className="table table-success table-striped" style={{fontSize : "32px"}} >
                        <th>BillID</th>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>

                        <tr style={{fontSize : "22px"}}>
                            <td>
                                {expenses.map(post => ( 
                                    <p key={post._id}>{post.billID}</p>
                                ))}
                            </td>

                            <td>
                                {expenses.map(post => ( 
                                    <p key={post._id}>{post.date}</p>
                                ))}
                            </td>
                                
                            <td>
                                {expenses.map(post => ( 
                                    <p key={post._id}>{post.payee}</p>
                                ))}
                                
                            </td>

                            <td>
                                {expenses.map(post => ( 
                                    <p key={post._id}>{post.amount}</p>
                                ))}
                                
                            </td>

                            <td>
                                {expenses.map(post => ( 
                                    <p key={post._id}>{post.description}</p>
                                ))}
                                
                            </td>


                            <td>
                                 {expenses.map(post => ( 
                                    <p key={post._id}>
                                        
                                        
                                        <button type="button" class="btn btn-primary" onClick={(e) => routeChange(post._id, e)} style={{fontSize : "16px"}} >Edit</button>
                                        
                                        <span>   </span>
                                        <button type="button" class="btn btn-danger"  onClick={(e) => deleteRow(post._id, e)} >Delete</button>

                                        
                                    </p>

                                ))}
                            
                            </td>

                        </tr>
                    </table> */}




        </div>
        </div>  
        
    )

 }
