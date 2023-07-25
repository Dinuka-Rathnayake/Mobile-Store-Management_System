import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getApi } from "../utils/axios";
import Header from "../common/Header";
import { CartContext } from "./context/CartContext";

const Item = () => {
  const { id } = useParams();
  const { addItemToCart } = useContext(CartContext);
  const [item, setItem] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  // const history = useHistory();
  const navigate = useNavigate();



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

  const handleAddToCart = () => {
    //alert(item.name)
    addItemToCart(item);
  };

  const handleBuyNow = () => {
    if (isLoggedIn) { // replace "isLoggedIn" with your user authentication check
     navigate(`/checkout/${id}`);
     } else {
     navigate("/signin-signup");
    }
  };


  return (
<>
    <Header />
    <div className="product-details-top">
  <div className="row">
    <div className="col-md-6">
      <div className="product-gallery product-gallery-vertical">
        <div className="row">
          <figure className="product-main-image">
          <img src={item.imgUrl} className="img-fluid" alt={item.name} />
            <a
              href="#"
              id="btn-product-gallery"
              className="btn-product-gallery"
            >
              <i className="icon-arrows" />
            </a>
          </figure>
          {/* End .product-main-image */}
          {/* End .product-image-gallery */}
        </div>
        {/* End .row */}
      </div>
      {/* End .product-gallery */}
    </div>
    {/* End .col-md-6 */}
    <div className="col-md-6">
      <div className="product-details">
        <h1 className="product-title">{item.name}</h1>
        {/* End .product-title */}
        <div className="ratings-container">
          <div className="ratings">
            <div className="ratings-val" style={{ width: "80%" }} />
            {/* End .ratings-val */}
          </div>
          {/* End .ratings */}
          <a
            className="ratings-text"
            href="#product-review-link"
            id="review-link"
          >
            ( 2 Reviews )
          </a>
        </div>
        {/* End .rating-container */}
        <div className="product-price">${item.price}</div>
        {/* End .product-price */}
        <div className="product-content">
          <p>
          Categories: Mobile Phones, Samsung
          </p>
        </div>
        {/* End .product-content */}
        <div className="product-details-action">
        <button className="btn btn-primary mr-2" onClick={handleAddToCart}>Add to cart</button>
        <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
          {/* End .details-action-wrapper */}
        </div>
        {/* End .product-details-action */}
        <div className="product-details-footer">
         
          {/* End .product-cat */}
        </div>
        {/* End .product-details-footer */}
      </div>
      {/* End .product-details */}
    </div>
    {/* End .col-md-6 */}
  </div>
  {/* End .row */}
</div>


<div className="product-details-tab">
  <ul className="nav nav-pills justify-content-center" role="tablist">
    <li className="nav-item">
      <a
        className="nav-link active"
        id="product-desc-link"
        data-toggle="tab"
        href="#product-desc-tab"
        role="tab"
        aria-controls="product-desc-tab"
        aria-selected="true"
      >
        Description
      </a>
    </li>
   
    
    <li className="nav-item">
      <a
        className="nav-link"
        id="product-review-link"
        data-toggle="tab"
        href="#product-review-tab"
        role="tab"
        aria-controls="product-review-tab"
        aria-selected="false"
      >
        Reviews (2)
      </a>
    </li>
  </ul>
  <div className="tab-content">
    <div
      className="tab-pane fade active show"
      id="product-desc-tab"
      role="tabpanel"
      aria-labelledby="product-desc-link"
    >
      <div className="product-desc-content">
        <h3>Product Information</h3>
        <p>{item.description}</p>
      </div>
      {/* End .product-desc-content */}
    </div>
    {/* .End .tab-pane */}
  </div>
  {/* End .tab-content */}
</div>


    </>
  );
}


export default Item;



{/* <div className="container mt-5">
<div className="row">
  <div className="col-md-6">
    <img src={item.imgUrl} className="img-fluid" alt={item.name} />
  </div>
  <div className="col-md-6">
    <h3>{item.name}</h3>
    <p>{item.description}</p>
    <h4>${item.price}</h4>
    <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
   
      <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
  
  </div>
</div>
</div> */}