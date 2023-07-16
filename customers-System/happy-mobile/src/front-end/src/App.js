import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';

import Products from './pages/products'
import Checkout from './pages/checkout';
import Orders from './pages/admin/orders';
import CategoryCreate from './pages/admin/category';
import Item from './pages/item';
import CartContextProvider from './pages/context/CartContext';
import Cart from './pages/cart';
import Profile from './pages/profile';
import EditOrder from './pages/admin/editOrders';


function App(){

    return(
  <div>
        {/* <React.StrictMode> */}
          <Router>
          <CartContextProvider>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/item/:id" element={<Item />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin-signup" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/:slug" element={<Products />} />
              <Route path='/checkout/:id' element={<Checkout />} />
              <Route path='/admin/orders/:id/edit' element={<EditOrder />} />
              <Route path='/admin/orders' element={<Orders />} />
              <Route path="/admin/add-category" element={<CategoryCreate />} />
            </Routes>
            </CartContextProvider>
          </Router>
        {/* </React.StrictMode> */}
  </div>
);
}

export default App;