import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";


// import {Container,button} from '@mui/material';


export default function SalaryReportPage(setId){

        const [SalaryDetails,setSalaryDetails] = useState([])


        const navigate = useNavigate()

        useEffect(()=>{
            function getSalary(){
            axios.get('http://localhost:8070/Salary').then((res)=>{
                setSalaryDetails(res.data)
                    console.log(res.data)
                }).catch((err)=>{
                    alert(err.message)
                })
            }
            getSalary()
        },[])

        console.log(SalaryDetails)

    //     const routeChange = (id) =>{
             
    //      setId(id);
    //      alert(id);
         
    //      const path = "/EditEmployee"
    //      navigate(path)
    //    } 

    //    const deleteRow = (id) =>{
             
    //     axios.delete(`http://localhost:8070/Employee/delete/${id}`).then(()=>{
    //         setEmployeeDetails(EmployeeDetails.filter((val)=>{
    //             return val._id !==id;
    //         }))
    //     })
    // } 

        
    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "My Awesome Report";
	// add table header
        const headers = [["Employee ID", "Rate per hour","Hour per day","Nof woking days","Gross Salary","Deduction","Net Salary"]];
		
	// assign needed colums to print
        const data = SalaryDetails.map(elt=> [elt.Employeeid, elt.RatePerHour,elt.HourPerDay,elt.NumberOfWokingDays,elt.GrossSalary,elt.Deduction,elt.NetSalary]);

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

        <div className="form-out">
            <h1>Salary Details</h1>
        <div>
    
    <div>
     

      <div className="col-md-12">
              <div className="float-end">
                  <button  className="btn btn-primary " onClick={()=>exportPDF()}>Genarate Report </button>
              </div> <br/>
         </div>

      <table className="table table-success table-striped" style={{fontSize : "18px"}} >
                        <th>|Employee ID</th>
                        <th>|Rate per hour</th>
                        <th>|Hour per day</th>
                        <th>|Number of woking days</th>
                        <th>|Gross Salary</th>
                        <th>|Deduction</th>
                        <th>|Net Salary</th>
                        
                      

                        <tr style={{fontSize : "15px"}}>
                            <td>
                                {SalaryDetails.map(post => ( 
                                    <p key={post._id}>{post.Employeeid}</p>
                                ))}
                            </td>

                            <td>
                                {SalaryDetails.map(post => ( 
                                    <p key={post._id}>{post.RatePerHour}</p>
                                ))}
                            </td>

                            <td>
                                {SalaryDetails.map(post => ( 
                                    <p key={post._id}>{post.HourPerDay}</p>
                                ))}
                            </td>
                                
                            <td>
                                {SalaryDetails.map(post => ( 
                                    <p key={post._id}>{post.NumberOfWokingDays}</p>
                                ))}
                            </td>

                            <td>
                                {SalaryDetails.map(post => ( 
                                    <p key={post._id}>{post.GrossSalary}</p>
                                ))}
                            </td>

                            <td>
                                {SalaryDetails.map(post => ( 
                                    <p key={post._id}>{post.Deduction}</p>
                                ))}
                            </td>

                            
                            <td>
                             
                                {SalaryDetails.map(post => ( 
                                    <p key={post._id}>{post.NetSalary}</p>
                                ))}
                                
                            </td>
                            
                         
                           

                         

                             

                        </tr>
                    </table>
     
    </div>
    </div>
    </div>
    )

}