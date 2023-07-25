import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import Header from "../common/Header";

const Cart = () => {
  const { cartItems, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } = useContext(CartContext);

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };

  const handleIncreaseItemQuantity = (id) => {
    increaseItemQuantity(id);
  };

  const handleDecreaseItemQuantity = (id) => {
    decreaseItemQuantity(id);
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return<div>Your cart is empty</div> ;
    }

    return cartItems.map((item) => (
      
      <div className="row my-3" key={item.id}>
        <div className="col-md-3">
          <img src={item.imgUrl} alt={item.name} className="img-fluid" />
        </div>
        <div className="col-md-9">
          <h4>{item.name}</h4>
          <p className="mb-0">${item.price} x {item.quantity}</p>
          <div className="btn-group mt-2">
            <button className="btn btn-primary" onClick={() => handleIncreaseItemQuantity(item.id)}>+</button>
            <button className="btn btn-primary" onClick={() => handleDecreaseItemQuantity(item.id)}>-</button>
            <button className="btn btn-danger" onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        </div>
      </div>
    
    ));
  };

  const renderTotalPrice = () => {
    if (cartItems.length === 0) {
      return null;
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
      <div className="row mt-5">
        <div className="col-md-9">
          <h4>Total price:</h4>
        </div>
        <div className="col-md-3">
          <h4>${totalPrice}</h4>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container py-5">
        <Header />
        <h2>Your Cart</h2>
        {renderCartItems()}
        {renderTotalPrice()}
      </div>
    </>
  );
};

export default Cart;
