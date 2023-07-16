import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DeliveryGuy({setId}){

    const [deliveryGuy, setdeliveryGuy] = useState([]);
   

    const navigate = useNavigate();

    useEffect(() => {
        function getStudents() {
            axios.get("http://localhost:8070/deliveryGuys/display").then((res) =>{
                setdeliveryGuy(res.data);
                 console.log(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getStudents();
        
    }, [])

    console.log(deliveryGuy)

    const deleteRow = (id) =>{
             
        axios.delete(`http://localhost:8070/deliveryGuys/delete/${id}`).then(()=>{
            alert("Deleted")
            setdeliveryGuy(deliveryGuy.filter((val)=>{
                return val._id !==id;
            }))
        })
      }

   
    const routeChange = (id, e) =>{
        
        setId(id);
        alert(id);
        
        const path = "edit/"
        navigate(path)

    }

    

    return(
        <div className="container">
            <h1>This is All Delivery Guys</h1>
            <button className="btn btn-primary" onClick={()=> navigate("/deliver/addDeliveryGuy")}>Add New</button>
            <table className="table table-success table-striped" style={{fontSize : "25px"}} >
                        <th>Name</th>
                        <th>Adress name</th>
                        <th>Id Number</th>
                        <th>Mobile Number</th>
                        <th>Age</th>
                        

                        <tr style={{fontSize : "18px"}}>
                            <td>
                                {deliveryGuy.map(post => ( 
                                    <p key={post._id}>{post.name}</p>
                                ))}
                            </td>

                            <td>
                                {deliveryGuy.map(post => ( 
                                    <p key={post._id}>{post.adress}</p>
                                ))}
                            </td>

                            <td>
                                {deliveryGuy.map(post => ( 
                                    <p key={post._id}>{post.idno}</p>
                                ))}
                            </td>
                                
                            <td>
                                {deliveryGuy.map(post => ( 
                                    <p key={post._id}>{post.mobile}</p>
                                ))}
                            </td>

                            <td>
                                {deliveryGuy.map(post => ( 
                                    <p key={post._id}>{post.age}</p>
                                ))}
                            </td>

                            

                         

                            <td>
                                 {deliveryGuy.map(post => ( 
                                    <p key={post._id} >
                                        
                                        
                                        <button type="button" className="btn btn-primary" onClick={(e) => routeChange(post._id, e)}>Edit</button>
                                        
                                        <span>          </span>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteRow(post._id)}>Delete</button>

                                        
                                    </p>

                                ))}
                            
                            </td>

                        </tr>
                    </table>
        
        </div>

        

    )
}