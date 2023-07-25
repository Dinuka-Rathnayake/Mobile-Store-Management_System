import React, { useState, useEffect } from "react";
import { getApi } from "../utils/axios"
import { popAlert } from "../utils/alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { authActions } from "../reducers/auth";
import Footer from "../common/Footer";

function Checkout() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const [FirstName, setFirstName] = useState("");
  const [SecondName, setSecondName] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Description, setDescription] = useState("");
  const [item, setItem] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function getItem() {
      getApi().get(`api/products/ss/${id}`).then((res) => {
        setItem(res.data);
        // alert(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getItem();
  }, [id])

  const placeOrder = (e) => {
    e.preventDefault();

    if (isLoggedIn) { 
      getApi()
      .post("api/user/orders", {
        user_id:authState.user.userId,
        first_name: FirstName,
        last_name: SecondName,
        address: Address,
        city: City,
        phone: Phone,
        email: Email,
        description: Description,
        item: id
      }).then((res) => {
        popAlert("Success!",
          "You have successfully placed the order!",
          "success",
          "Ok");
        navigate("/");
      }).catch((err) => {
        popAlert("Error!", err.response.data.message, "error", "Ok");
        console.error(err);
      });
      } else {
      navigate("/signin-signup");
     }
   
  };

  // const items = location.state.items; // get the items array from location state

  // const [paymentInProgress, setPaymentInProgress] = useState(false);

  // const handlePayment = () => {
  //   setPaymentInProgress(true);

  //   const payment = {
  //     sandbox: true, // Set to false for live payments
  //     merchant_id: 'YOUR_MERCHANT_ID',
  //     return_url: 'http://localhost:3000/success',
  //     cancel_url: 'http://localhost:3000/cancel',
  //     notify_url: 'http://localhost:3000/notify',
  //     order_id: 'ORDER_ID',
  //     items: 'Test Item',
  //     amount: 100,
  //     currency: 'LKR',
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: 'john.doe@example.com',
  //     phone: '0771234567',
  //     address: '123 Main St',
  //     city: 'Colombo',
  //     country: 'Sri Lanka',
  //     delivery_address: '456 Second St',
  //     delivery_city: 'Negombo',
  //     delivery_country: 'Sri Lanka',
  //     custom_1: '',
  //     custom_2: '',
  //     hash: '', // This will be filled in by the PayHere SDK
  //   };

  //   window.PayHere.startPayment(payment, onCompleted, onError);
  // };

  // const onCompleted = (orderId) => {
  //   console.log(`Payment successful! Order ID: ${orderId}`);
  //   setPaymentInProgress(false);
  // };

  // const onError = (error) => {
  //   console.log(`Payment error: ${error}`);
  //   setPaymentInProgress(false);
  // };


  return (

    <>
      <main className="main">
        <div className="page-content">
          <div className="checkout">
            <div className="container">
              <div className="checkout-discount">

              </div>
              {/* End .checkout-discount */}
              <form onSubmit={placeOrder}>
                <div className="row">
                  <div className="col-lg-9">
                    <h2 className="pt-2">Checkout</h2>
                    <h2 className="checkout-title">Billing Details</h2>
                    {/* End .checkout-title */}
                    <div className="row">
                      <div className="col-sm-6">
                        <label>First Name *</label>
                        <input type="text" className="form-control" placeholder={authState.user.name} onChange={(e) => setFirstName(e.target.value)} required="" />
                      </div>
                      {/* End .col-sm-6 */}
                      <div className="col-sm-6">
                        <label>Last Name *</label>
                        <input type="text" className="form-control" onChange={(e) => setSecondName(e.target.value)} required="" />
                      </div>
                      {/* End .col-sm-6 */}
                    </div>
                    {/* End .row */}

                    <label>Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setAddress(e.target.value)}
                      required=""
                    />
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Town / City *</label>
                        <input type="text" className="form-control" onChange={(e) => setCity(e.target.value)} required="" />
                      </div>
                      {/* End .col-sm-6 */}
                      <div className="col-sm-6">
                        <label>Phone *</label>
                        <input type="tel" className="form-control" onChange={(e) => setPhone(e.target.value)} required="" />
                      </div>
                      {/* End .col-sm-6 */}
                    </div>
                    {/* End .row */}
                    <label>Email *</label>
                    <input type="select" className="form-control" placeholder={authState.user.email}onChange={(e) => setEmail(e.target.value)} required="" />
                    <div className="custom-control custom-checkbox">
                    </div>

                    {/* End .custom-checkbox */}
                    <label>Order notes (optional)</label>
                    <textarea
                      className="form-control"
                      cols={30}
                      rows={4}
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      defaultValue={""}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3 pt-3">
                    <div className="summary">
                      <h3 className="summary-title">Your Order</h3>
                      {/* End .summary-title */}
                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                            <tr key={item.id}>
                              <td>
                                <a href="#">{item.name}</a>
                              </td>
                              <td>${item.price}</td>
                            </tr>
                         
                          <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>${item.price}</td>
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr className="summary-total">
                            <td>Total:</td>
                            <td>${item.price}</td>
                          </tr>
                          {/* End .summary-total */}
                        </tbody>
                      </table>
                      {/* End .table table-summary */}
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2 btn-order btn-block"
                      >
                        <span className="btn-text">Place Order</span>

                      </button>
                    </div>
                    {/* End .summary */}
                  </aside>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </form>
            </div>
            {/* End .container */}
          </div>
          {/* End .checkout */}
        </div>
        {/* End .page-content */}
      </main>
      <Footer />
    </>

  );
}

export default Checkout;