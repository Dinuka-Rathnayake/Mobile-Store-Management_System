import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApi } from "../../utils/axios";

function EditOrder() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: "",
  });

  useEffect(() => {
    function getOrder(){
      getApi().get(`api/admin/orders/${id}`)
        .then((res)=>{
          console.log(res.data);
          setOrder(res.data);
        }).catch((err)=>{
          alert(err.message);
      })
    }
    getOrder();
  },[id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    event.preventDefault();

    // Send PUT request to backend API
    getApi()
      .put(`api/admin/orders/${id}`, order)
      .then((res) => {
        console.log(res.data);
        // Redirect to Orders page on successful update
        navigate("/admin/orders");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(order);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={order.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={order.last_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={order.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={order.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={order.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={order.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={order.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Update Order
      </button>
    </form>

  );

}

export default EditOrder;