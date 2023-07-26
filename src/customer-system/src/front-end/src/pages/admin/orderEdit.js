import React, { useState, useEffect } from "react";
import { getApi } from "../../utils/axios";
import { useParams } from "react-router-dom";

function OrderEdit() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getApi()
      .get(`/api/admin/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [orderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update order details here
    //Update
  };

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Edit Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group">
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
         type="email"
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
       />
</div>
<button type="submit" className="btn btn-primary">
Update Order
</button>
</form>
</div>
);
}

export default EditOrderForm;