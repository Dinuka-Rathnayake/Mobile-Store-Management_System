import axios from "axios";
import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
/* import EditProducts from "./EditProducts"; */
import JsPDF from "jspdf";
import "jspdf-autotable";
import './Addsuppliers.css'


/* import { useEffect , useState } from "react"; */

import {
  Container
} from '@mui/material';

export default function SuppliyHistory(setId) {

  const [SupplierDetails, SetSupplierDetails] = useState([])
  let ID


  const navigate = useNavigate()


  useEffect(()=>{
    function getSippliers() {
      axios.get('http://localhost:8070/supplier_deliverydetails/get_supplier_deliverydetails/').then((res)=>{
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
  function deleteRow(id, e){
    e.preventDefault();

    axios.delete(`http://localhost:8070/supplier_details/delete_supplier_details/${id}`).then(res => 
        console.log('Deleted!!!', res)).catch(err => console.log(err))

        // reload page after delete
        window.location.reload(true);
}

  /* navigate to edit product */
 /*  const routeChange = (id, e) =>{
        
    setId(id);
    alert(id);
    
    const path = "edit/"
    navigate(path)
  } */

 /*  //export to pdf */

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new JsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Supply History Report";
    const headers = [["Supplier ID", "Items", "Quentity", "Delivery Date"]];

    const data = SupplierDetails.map(elt=> [elt.SupplierId, elt.Items, elt.Quentity, elt.DeliveryDate]);

    const content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("supply history report.pdf")


}





  return (
    
    
    <div className="container mt-5">
       <div className="form-out">
       <h1>Supply History</h1>
       <div className="float-end">
       <button className="btn btn-primary" onClick={()=> navigate("/supplier/AddSupplyDetails")}>Add New</button> <span/>
       <button className="btn btn-primary" onClick={() => exportPDF()}>Generate Report</button>
       </div><table className="table table-success table-striped" style={{fontSize : "32px"}} >
      
      
      {/* <div className="col-md-12">
                            <div className="float-end">
                                <button type="button" className="btn btn-primary " onClick={()=>navigate("/dashboard/AddSupplyDetails")}>New supply</button>
                                <button className="btn btn-primary" onClick={() => exportPDF()}>Generate Report</button>
                            </div> <br/>
                        </div>
     
      <table className="table table-success table-striped" style={{fontSize : "20px"}} > */}
                        <th>Supplier ID</th>
                        <th>Items</th>
                        <th>Quentity</th>
                        <th>Delivery Date</th>
                        
                        

                        <tr style={{fontSize : "18px"}}>
                            <td>
                                {SupplierDetails.map(post => ( 
                                    <p key={post._id}>{post.SupplierId}</p>
                                ))}
                            </td>

                            <td>
                                {SupplierDetails.map(post => ( 
                                    <p key={post._id}>{post.Items}</p>
                                ))}
                            </td>
                                
                            <td>
                                {SupplierDetails.map(post => ( 
                                    <p key={post._id}>{post.Quentity}</p>
                                ))}
                            </td>

                            <td>
                                {SupplierDetails.map(post => ( 
                                    <p key={post._id}>{post.DeliveryDate}</p>
                                ))}
                            </td>

                            
                            
                            

                         

                             

                        </tr>
                    </table>
                    </div>
                    </div>
     
      
   
    
  
  )

}