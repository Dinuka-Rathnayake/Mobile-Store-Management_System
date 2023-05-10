import axios from "axios";
import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import JsPDF from "jspdf";
import "jspdf-autotable";
import './CustomerInquiry.css'




import {
  Container
} from '@mui/material';

export default function ViewCustomerInquiry(setId) {

  const [CustomerInquiry, SetCustomerInquiry] = useState([])
  let ID


  const navigate = useNavigate()


  useEffect(()=>{
    function getSippliers() {
      axios.get('http://localhost:8070/customer/get_customers_details/').then((res)=>{
        SetCustomerInquiry(res.data)
          console.log(res.data)
      }).catch((err)=>{
        alert(err.message)
      })
    }
    getSippliers()
  }, [])

  console.log(CustomerInquiry)

  /* delete product */
  const deleteRow = (id) =>{
             
    axios.delete(`http://localhost:8070/customer/delete/${id}`).then(()=>{
      alert("Details Delete")
        SetCustomerInquiry(CustomerInquiry.filter((val)=>{
            return val._id !==id;
        }))
    })
  
        /* // reload page after delete
        window.location.reload(true); */
}



  /* navigate to edit product */
  const routeChange = (id, e) =>{
        
    setId(id);
    alert(id);
    
    const path = "edit/"
    navigate(path)
  }

  

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new JsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Inquiry Report";
    const headers = [["Name", "Id", "Email", "Inquiry", "Responding"]];

    const data = CustomerInquiry.map(elt=> [elt.name, elt.id, elt.email, elt.inquiry, elt.responding]);

    const content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("inquiry report.pdf")


}





  return (
    
    
    <div className="container mt-5">
       <div className="form-out">
       <h1>Responding customer inquiry </h1>
       <div className="float-end">
       <button type="button" className="btn btn-primary " onClick={()=>navigate("/inquier/")}>Responding New inquiry</button> <span/>
       <button className="btn btn-primary" onClick={() => exportPDF()}>Generate Report</button>
       </div>
      
          
        
          
        
          <table className="table table-success table-striped" style={{fontSize : "20px"}} >
                            <th>Customer name</th>
                            <th>Customer ID</th>
                            <th>Customer Email</th>
                            <th>Inquiry</th>
                            <th>responding</th>
                            

                            <tr style={{fontSize : "18px"}} >
                                <td>
                                    {CustomerInquiry.map(post => ( 
                                        <p key={post._id}>{post.name}</p>
                                    ))}
                                </td>

                                <td>
                                    {CustomerInquiry.map(post => ( 
                                        <p key={post._id}>{post.id}</p>
                                    ))}
                                </td>

                                <td>
                                    {CustomerInquiry.map(post => ( 
                                        <p key={post._id}>{post.email}</p>
                                    ))}
                                </td>
                                    
                                <td>
                                    {CustomerInquiry.map(post => ( 
                                        <p key={post._id}>{post.inquiry}</p>
                                    ))}
                                </td>
                                <td>
                                    {CustomerInquiry.map(post => ( 
                                        <p key={post._id}>{post.responding}</p>
                                    ))}
                                </td>
                                

                            

                                <td>
                                    {CustomerInquiry.map(post => ( 
                                        <p key={post._id}>
                                            
                                            
                                                
                                            <button type="button" className="btn btn-primary" onClick={() => routeChange(post._id)}>Edit</button>
                                            {/* <button type="button" className="btn btn-danger" onClick={(e) => routeChange("/dashboard/AddSuppliers")}>Edit</button> */}
                                            <span/>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteRow(post._id)}>Delete</button>

                                            
                                        </p>

                                    ))}
                                
                                </td>

                            </tr>
                        </table>
                    </div>
                    </div>
     
      
   
    
  
  )

}
