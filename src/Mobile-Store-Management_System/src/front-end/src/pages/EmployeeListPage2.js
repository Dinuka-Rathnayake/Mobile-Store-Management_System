import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import {Container,button} from '@mui/material';


export default function EmployeeList(setId){

        const [EmployeeDetails,setEmployeeDetails] = useState([])


        



        

        const navigate = useNavigate()

        useEffect(()=>{
            function getEmployees(){
            axios.get('http://localhost:8070/Employee').then((res)=>{
                setEmployeeDetails(res.data)
                    console.log(res.data)
                }).catch((err)=>{
                    alert(err.message)
                })
            }
            getEmployees()
        },[])

        console.log(EmployeeDetails)

        const routeChange = (id) =>{
             
         setId(id);
         alert(id);
         
         const path = "/EditEmployee"
         navigate(path)
       } 

       const deleteRow = (id) =>{
             
        axios.delete(`http://localhost:8070/Employee/delete/${id}`).then(()=>{
            setEmployeeDetails(EmployeeDetails.filter((val)=>{
                return val._id !==id;
            }))
        })
    } 


    return(



        


        
        <div className="form-out">
            <h1>Employee List</h1>
        <div>
    
    <div>
      {/* <Container> */}

      <div className="col-md-12">
              <div className="float-end">
                  <button type="button" className="btn btn-primary " onClick={()=>navigate("/dashboard/AddEmployeePage")}>Add Employee</button>
              </div> <br/>
         </div>
        
      <table className="table table-success table-striped" style={{fontSize : "18px"}} >
                        <th>|Employee Name</th>
                        <th>|Email address</th>
                        <th>|Registation Date</th>
                        <th>|Phone number</th>
                        <th>|Employee ID</th>
                        <th>|Employee Password</th>
                        <th>|Department</th>
                      

                        <tr style={{fontSize : "15px"}}>
                            <td>
                                {EmployeeDetails.map(post => ( 
                                    <p key={post._id}>{post.Employee_Name}</p>
                                ))}
                            </td>

                            <td>
                                {EmployeeDetails.map(post => ( 
                                    <p key={post._id}>{post.Email_Address}</p>
                                ))}
                            </td>

                            <td>
                                {EmployeeDetails.map(post => ( 
                                    <p key={post._id}>{post.Registation_Date}</p>
                                ))}
                            </td>
                                
                            <td>
                                {EmployeeDetails.map(post => ( 
                                    <p key={post._id}>{post.Phone_no}</p>
                                ))}
                            </td>

                            <td>
                                {EmployeeDetails.map(post => ( 
                                    <p key={post._id}>{post.Employee_id}</p>
                                ))}
                            </td>

                            <td>
                                {EmployeeDetails.map(post => ( 
                                    <p key={post._id}>{post.Employee_PW}</p>
                                ))}
                            </td>

                            <td>
                             
                                {EmployeeDetails.map(post => ( 
                                    <p key={post._id}>{post.Department}</p>
                                ))}
                                
                            </td>
                         
                           

                         

                             <td style={{fontSize : "8px"}}>
                                 {EmployeeDetails.map(post => ( 
                                    <p key={post._id} >
                                        
                                        
                                        <button   type="button"  className="btn btn-primary" onClick={() =>routeChange(post._id, )}>Edit</button>
                                        
                                        
                                      
                                        <button  type="button" className="btn btn-danger" onClick={() => deleteRow(post._id)}>Delete</button>

                                        {/* <div className="col-md-12">
              <div className="float-end">
                  <button type="button" className="btn btn-primary " onClick={()=>navigate("/dashboard/AddEmployeePage")}>Add Employee</button>
              </div> <br/>
         </div> */}

                                        
                                    </p>

                                ))}
                            
                            </td>

                        </tr>
                    </table>
      {/* <ul>
        {EmployeeDetails.map((list, index)=>(

          <li key={index}> {list.User_Id} | {list.Email}</li>
        ))}
      </ul> */}


      {/* </Container> */}
    </div>
    </div>
    </div>
    )

}