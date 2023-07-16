import React,{ useState, useEffect } from "react";
import { getApi } from "../utils/axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";



function Orders() {

    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
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

      useEffect(()=>{
        getOrders();
      },[])

      useEffect(() => {

        if (orders.length > 0) {
          const itemIds = orders.map((order) => order.item);
          setLoading(true);
          getApi()
            .get(`/api/products/getproducts?ids=${itemIds.join(",")}`)
            .then((res) => {
              // console.log(res.data.imgUrl)
              setItems(res.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [orders]);


    function getOrders(){
      getApi().get("api/admin/getorders").then((res)=>{
          console.log(res.data);
          setOrders(res.data);
      }).catch((err)=>{
          alert(err.message);
      })
      
  }
 //getOrders();

 function handleRemoveOrder(orderId) {
  //alert(orderId)
  getApi()
    .delete(`/api/orders/${orderId}`)
    .then((res) => {
      setOrders(orders.filter((order) => order._id !== orderId));
    })
    .catch((err) => {
      console.error(err);
    });
}


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
          <div>
           
           {/* <h2>Order History</h2> */}
   {loading ? (
   <p>Loading...</p>
 ) : (
<table className="table table-cart table-mobile">
<thead>
<tr>
<th>Name</th>
<th>Address</th>
<th>Email</th>
<th>Phone</th>
<th>Product</th>
<th>Price</th>
<th>Date</th>
<th>Total</th>
<th />
</tr>
</thead>
<tbody>
{orders.map((order) => {
         const item = items.find((item) => item._id === order.item);
         return (
<tr>
<td className="price-col">{order.first_name}</td>
<td className="price-col">{order.address}</td>
<td className="price-col">{order.email}</td>
<td className="price-col">{order.phone}</td>
<td className="product-col">{item ? item.name : ""}</td>

<td className="price-col">Rs{item ? item.price : ""}</td>
<td className="price-col">{new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>

<td className="price-col">Rs{item ? item.price : ""}</td>
<td className="remove-col">
 <button className="btn-remove" onClick={() => handleRemoveOrder(order._id)}>
   <i className="icon-close" />
 </button>
 <Link to={`admin/orders/${order._id}/edit`} className="btn btn-warning mr-2"><button className="btn btn-danger" >
  <i className="icon-close" />
 </button>
</Link>
  
</td>
</tr>
         );
          })}
</tbody>
</table>
)}
 </div>

        </div>
      );
    

}

export default Orders;