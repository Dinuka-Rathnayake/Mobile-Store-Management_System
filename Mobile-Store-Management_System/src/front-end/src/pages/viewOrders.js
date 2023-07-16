import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ViewOrder({setId}){

    const [viewOrder, setviewOrder] = useState([]);
   

    const navigate = useNavigate();

    useEffect(() => {
        function getStudents() {
            axios.get("http://localhost:8070/deliveryOrder/display").then((res) =>{
                setviewOrder(res.data);
                 console.log(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getStudents();
        
    }, [])

    console.log(viewOrder)

    
const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; 
    const orientation = "portrait"; 

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";

    const headers = [["ID", "Name","Quentity","ID","Adress"]];
    

    const data = viewOrder.map(elt=> [elt.orderId, elt.name,elt.quentity,elt.idno,elt.adress]);

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
            <h1>This is All Delivery orders</h1>
            <button className="btn btn-primary" onClick={()=> navigate("/deliver/addOrder")}>Add New</button>
            <table className="table table-success table-striped" style={{fontSize : "25px"}} >
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Quentity</th>
                        <th>ID</th>
                        <th>Adress</th>
                        

                        <tr style={{fontSize : "18px"}}>
                            <td>
                                {viewOrder.map(post => ( 
                                    <p key={post._id}>{post.orderId}</p>
                                ))}
                            </td>

                            <td>
                                {viewOrder.map(post => ( 
                                    <p key={post._id}>{post.name}</p>
                                ))}
                            </td>

                            <td>
                                {viewOrder.map(post => ( 
                                    <p key={post._id}>{post.quentity}</p>
                                ))}
                            </td>
                                
                            <td>
                                {viewOrder.map(post => ( 
                                    <p key={post._id}>{post.idno}</p>
                                ))}
                            </td>

                            <td>
                                {viewOrder.map(post => ( 
                                    <p key={post._id}>{post.adress}</p>
                                ))}
                            </td>

                            
                            

                         

                            

                        </tr>
                    </table>
                    <div className="col-md-12">
                            <button className="btn btn-primary" onClick={()=>exportPDF()}>Print</button>
                        </div>

        </div>

        

        

    )
}