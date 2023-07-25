import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../reducers/auth";
import { getApi } from "../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../common/Header";



function Profile() {
    const authState = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (authState.isLoggedIn) {
        getOrders();
      }
    }, [authState]);
  
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
  
    function getOrders() {
      getApi()
        .get(`/api/orders/user/${authState.user.userId}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

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
  
    return (
      <>
        <Header />
      
        <div className="page-content">
  <div className="dashboard">
    <div className="container">
      <div className="row">
        <aside className="col-md-4 col-lg-3">
          <ul
            className="nav nav-dashboard flex-column mb-3 mb-md-0"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="tab-orders-link"
                data-toggle="tab"
                href="#tab-orders"
                role="tab"
                aria-controls="tab-orders"
                aria-selected="true"
              >
                Orders
              </a>
            </li>
            {/* <li className="nav-item">
              <a
                className="nav-link"
                id="tab-account-link"
                data-toggle="tab"
                href="#tab-account"
                role="tab"
                aria-controls="tab-account"
                aria-selected="false"
              >
                Account Details
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" onClick={() => {
                    dispatch(authActions.logout());
                    navigate("/");
                  }}>
                Sign Out
              </a>
            </li>
          </ul>
        </aside>
        {/* End .col-lg-3 */}
        <div className="col-md-8 col-lg-9">
          <div className="tab-content">
            <div
              className="tab-pane fade"
              id="tab-dashboard"
              role="tabpanel"
              aria-labelledby="tab-dashboard-link"
            >
              <p>
                Hello <span className="font-weight-normal text-dark">User</span>{" "}
                (not <span className="font-weight-normal text-dark">User</span>?{" "}
                <a href="#">Log out</a>)
                <br />
                From your account dashboard you can view your{" "}
                <a
                  href="#tab-orders"
                  className="tab-trigger-link link-underline"
                >
                  recent orders
                </a>
                , manage your{" "}
                <a href="#tab-address" className="tab-trigger-link">
                  shipping and billing addresses
                </a>
                , and{" "}
                <a href="#tab-account" className="tab-trigger-link">
                  edit your password and account details
                </a>
                .
              </p>
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane fade active show"
              id="tab-orders"
              role="tabpanel"
              aria-labelledby="tab-orders-link"
            >
                  <div>
           
                  {/* <h2>Order History</h2> */}
          {loading ? (
          <p>Loading...</p>
        ) : (
<table className="table table-cart table-mobile">
  <thead>
    <tr>
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
      <td className="product-col">
        <div className="product">
          <figure className="product-media">
            <a href="#">
              <img src={item.imgUrl} alt={item.name} className="img-fluid" />
            </a>
          </figure>
          <h3 className="product-title">
            <a href="#">{item ? item.name : ""}</a>
          </h3>
          {/* End .product-title */}
        </div>
        {/* End .product */}
      </td>
      <td className="price-col">${item ? item.price : ""}</td>
      <td className="price-col">{new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>
     
      <td className="total-col">${item ? item.price : ""}</td>
      <td className="remove-col">
        <button className="btn-remove" onClick={() => handleRemoveOrder(order._id)}>
          <i className="icon-close" />
        </button>
      </td>
    </tr>
                );
                 })}
  </tbody>
</table>
 )}
        </div>

            </div>
            {/* .End .tab-pane */}
          </div>
        </div>
        {/* End .col-lg-9 */}
      </div>
      {/* End .row */}
    </div>
    {/* End .container */}
  </div>
  {/* End .dashboard */}
</div>

      </>
    );
  }



export default Profile;
