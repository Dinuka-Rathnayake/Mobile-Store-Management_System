import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* import EditSuppliers from "./EditSuppliers"; */
import JsPDF from "jspdf";
import "jspdf-autotable";


import './Addsuppliers.css'


/* import { useEffect , useState } from "react"; */

import {
  Container
} from '@mui/material';

export default function SupplierList(setId) {

  const [SupplierDetails, SetSupplierDetails] = useState([])
  let ID


  const navigate = useNavigate()


  useEffect(()=>{
    function getSippliers() {
      axios.get('http://localhost:8070/supplier_details/get_supplier_details/').then((res)=>{
        SetSupplierDetails(res.data)
          console.log(res.data)
      }).catch((err)=>{
        alert(err.message)
      })
    }
    getSippliers()
  }, [])

  console.log(SupplierDetails)

  /* delete product */
  const deleteRow = (id) =>{
             
    axios.delete(`http://localhost:8070/supplier_details/delete_supplier_details/${id}`).then(()=>{
      alert("Details Delete")
        SetSupplierDetails(SupplierDetails.filter((val)=>{
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

  /* report */

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new JsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Supply History Report";
    const headers = [["Supplier ID", "Supplier Name", "Email", "PhoneNumber Date", "ItemType1", "ItemType2", "ItemType3"]];

    const data = SupplierDetails.map(elt=> [elt.SupplierId, elt.SupplierName, elt.Email, elt.PhoneNumber, elt.ItemType1, elt.ItemType2, elt.ItemType3]);

    const content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("supplier list report.pdf")


}





  return (
    
    
    <div className="container mt-5">
       <div className="form-out">
       <h1>Supplier List </h1>
       <div className="float-end">
       <button type="button" className="btn btn-primary " onClick={()=>navigate("/supplier/AddSuppliers")}>Add Supplier</button> <span/>
       <button className="btn btn-primary" onClick={() => exportPDF()}>Generate Report</button>
       </div>
      
          
        
          
        
          <table className="table table-success table-striped" style={{fontSize : "20px"}} >
                            <th>Supplier ID</th>
                            <th>Supplier name</th>
                            <th>Supplier Email</th>
                            <th>Phone Number</th>
                            <th>Items</th>
                            

                            <tr style={{fontSize : "18px"}} >
                                <td>
                                    {SupplierDetails.map(post => ( 
                                        <p key={post._id}>{post.SupplierId}</p>
                                    ))}
                                </td>

                                <td>
                                    {SupplierDetails.map(post => ( 
                                        <p key={post._id}>{post.SupplierName}</p>
                                    ))}
                                </td>

                                <td>
                                    {SupplierDetails.map(post => ( 
                                        <p key={post._id}>{post.Email}</p>
                                    ))}
                                </td>
                                    
                                <td>
                                    {SupplierDetails.map(post => ( 
                                        <p key={post._id}>{post.PhoneNumber}</p>
                                    ))}
                                </td>
                                <td>
                                    {SupplierDetails.map(post => ( 
                                        <p key={post._id}>{post.ItemType1}, {post.ItemType2}, {post.ItemType3} </p>
                                    ))}
                                </td>
                                

                            

                                <td>
                                    {SupplierDetails.map(post => ( 
                                        <p key={post._id}>
                                            
                                            
                                                
                                            <button type="button" className="btn btn-primary" onClick={(e) => routeChange(post._id, e)}>Edit</button>
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
