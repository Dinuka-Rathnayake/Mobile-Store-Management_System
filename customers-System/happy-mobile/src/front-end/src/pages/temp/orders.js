import React,{ useState, useEffect } from "react";
import { getApi } from "../../utils/axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";



function Orders() {

    const [orders, setOrders] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editFormData, setEditFormData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        description: "",
      });

    useEffect(() => {
        function getOrders(){
            getApi().get("api/admin/getorders").then((res)=>{
                console.log(res.data);
                setOrders(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
            
        }
        getOrders();
    },[])


    //export to pdf
    const exportPDF = () => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(15);
  
      const title = "Customer Order Report";
      const headers = [["First Name", "Last Name","Address","City","Phone","Email"]];

      const data = orders.map(elt=> [elt.first_name, elt.first_name, elt.address, elt.city, elt.phone, elt.email]);

      let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Customer Order report.pdf")


  }

    

    const handleEdit = (id) => {
        getApi().put("")
        // Implement your edit functionality here
        console.log("Edit order with ID:", id);
      };
    
      const handleDelete = (id) => {
        // Implement your delete functionality here
        console.log("Delete order with ID:", id);
      }

      return (
        <div className="container">
          <h1 className="my-4">Orders - Customer Details</h1>
          <button className="btn btn-primary mb-4" onClick={() => exportPDF()}>
            Download Report
          </button>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone</th>
                <th>Email</th>
                {/* <th>Description</th> */}
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.first_name}</td>
                  <td>{order.last_name}</td>
                  <td>{order.address}</td>
                  <td>{order.city}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  {/* <td>{order.description}</td> */}
                  <td>
                    <Link className="btn btn-primary" to={`/admin/edit-orders/${order._id}`}>
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    

}

export default Orders;