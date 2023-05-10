import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2'


 export default function AllIncomes({setId}){

    const  [incomes, setIncomes]=useState([]);

    useEffect(()=>{
        function getIncomes(){
          axios.get("http://localhost:8070/income/").then((res)=>{
            //console.log(res.data);
            setIncomes(res.data);
          }).catch((err)=>{
            alert(err.message);
          })   
        }
        getIncomes();

    },[])

     //delete Income
     function deleteRow(id, e){
        e.preventDefault();

        axios.delete(`http://localhost:8070/income/delete/${id}`).then(res => 
            console.log('Deleted!!!', res)).catch(err => console.log(err))

            // reload page after delete
            window.location.reload(true);
        
    }

    //navigate to EditIncome component
    let navigate = useNavigate();
    const routeChange = (id, e) =>{
       // ID = id;
       
        setId(id);
        console.log(id)
        alert(id);
        let path = "edit"
        navigate(path)

    }

    //export to pdf
    const exportPDF = () => {
        //alert("hii");
       
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "My Awesome Report";
        const headers = [["Bill Id", "Date","Payee","Amount","Discription"]];

        const data = incomes.map(elt=> [elt.billID, elt.date,elt.payee,elt.amount,elt.description]);

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
       <h2>All Incomes</h2>

       {/* <button className="btn btn-primary" onClick={()=> navigate("add")}>Add New</button> <span></span>
       <button className="btn btn-primary" onClick={() => exportPDF()}>Generate Report</button> */}
       <div className="row g-3 ">
            <div className="col-md-8">
                <button className="btn btn-primary" onClick={()=> navigate("add")}>Add New</button><span>  </span>
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
       <table className="table table-success table-striped" style={{fontSize : "32px"}} >
                        <th>BillID</th>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Action</th>

                        <tr style={{fontSize : "20px"}}>
                            <td>
                                {incomes.map(post => ( 
                                    <p key={post._id}>{post.billID}</p>
                                ))}
                            </td>

                            <td>
                                {incomes.map(post => ( 
                                    <p key={post._id}>{post.date}</p>
                                ))}
                            </td>
                                
                            <td>
                                {incomes.map(post => ( 
                                    <p key={post._id}>{post.payee}</p>
                                ))}
                                
                            </td>

                            <td>
                                {incomes.map(post => ( 
                                    <p key={post._id}>{post.amount}</p>
                                ))}
                                
                            </td>

                            <td>
                                {incomes.map(post => ( 
                                    <p key={post._id}>{post.description}</p>
                                ))}
                                
                            </td>


                            <td>
                                 {incomes.map(post => ( 
                                    <p key={post._id}>
                                        
                                        
                                        <button type="button" class="btn btn-primary" onClick={(e) => routeChange(post._id, e)}  >Edit</button>
                                        
                                        <span>   </span>
                                        <button type="button" class="btn btn-danger"  onClick={(e) => deleteRow(post._id, e)} >Delete</button>

                                        
                                    </p>

                                ))}
                            
                            </td>

                        </tr>
                    </table>




        </div>
        </div>
    )

 }
