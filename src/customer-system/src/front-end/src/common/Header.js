import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { authActions } from "../reducers/auth";

import { getAllCategory } from "../actions/category.action";
import { getProductsBySlug } from "../actions/product.action";

function Header({products,setProducts, items, setItems, slidebarVisibility}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const category = useSelector((state) => state.category);
  var SubCategoryName = "";
  var mainCategoryName = "";

  //search
  
  const catchProducts = products

  useEffect(() => {
    dispatch(getAllCategory());
    // items = products;
    
  }, []);

  //take sub category dropdown value
  const getSubCategoryName = (value) => {
    SubCategoryName = value
    
  };
  
  //take main category dropdown value
  const getMainCategoryName = (value) => {
    mainCategoryName = value
    
  };
  

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name} >
          {category.parentId ? (
            <Link onClick={() => getSubCategoryName(category.name)}>
              {" "}
              {category.name}{" "}
            </Link>
          ) : (
            <span className="sf-with-ul">{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul onClick={() => serchCategoryFunction(category.name)}>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };


  //sort related to category
  function serchCategoryFunction(categoryName){

    getMainCategoryName(categoryName);

    console.log("Mainvalue = "+ mainCategoryName);
    console.log("subvalue = "+ SubCategoryName);

    axios.get(`http://localhost:8070/api/categorySort?p=${mainCategoryName}&q=${SubCategoryName}`).then((response)=>{
        console.log(response.data)  
        // setItems(response.data)
        // slidebarVisibility.style.display = 'none'; // Hide the div 
        // setProducts(response.data)
        
      }).catch ((error)=> {
      console.error("Error searching:", error);
      })

  }


  //search function
  function serchFunction(e){
    var searchQuery = e.target.value;
    console.log(searchQuery);

    
    // console.log(items)
    // console.log("item length is "+items.length)

    var searchwordLenth = (parseInt(searchQuery.length)) 
    console.log("search word length = "+ searchwordLenth)

    if(searchwordLenth > 2){
      slidebarVisibility.style.display = 'none'; // Hide the div  
      axios.get(`http://localhost:8070/api/search?q=${searchQuery}`).then((response)=>{
        console.log(response.data)  
        // setItems(response.data)
        setProducts(response.data)
        
      }).catch ((error)=> {
      console.error("Error searching:", error);
      })
    }
    if(searchwordLenth < 2){
      setProducts(items)
      slidebarVisibility.style.display = 'block'; // Unhide the div  
  }
  else{
    setProducts(items)
    
  }
  };
  

  return (
    <header className="header header-intro-clearance header-4">
      <div className="header-middle">
        <div className="container">
          <div className="header-left">
            <button className="mobile-menu-toggler">
              <span className="sr-only">Toggle mobile menu</span>
              <i className="icon-bars" />
            </button>
            <a href="/" className="logo">
              <img
                src="assets/images/demos/demo-4/logo.png"
                alt="Molla Logo"
                width={105}
                height={25}
              />
            </a>
          </div>
          {/* End .header-left */}
          <div className="header-center">
            <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
              <a href="#" className="search-toggle" role="button">
                <i className="icon-search" />
              </a>
              <form action="#" method="get">
                <div className="header-search-wrapper search-wrapper-wide">
                  
                  <label htmlFor="q" className="sr-only">
                    Search
                  </label>
                  <button className="btn btn-primary" type="submit">
                    <i className="icon-search" />
                  </button>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search product ..."
                    onChange={serchFunction}
                  />
                  
                </div>
                {/* End .header-search-wrapper */}
              </form>
            </div>
            {/* End .header-search */}
          </div>
          <div className="header-right">
            {/* (<p onClick={() => {
                    dispatch(authActions.logout());
                    navigate("/");
                  }} >Signout</p>) */}

            <div className="wishlist">
              <a href="" title="Wishlist">
                {isLoggedIn ? (
                  <>
                    <div className="icon">
                      <NavLink to="/profile">
                        <i className="bi bi-person-circle" />
                      </NavLink>
                    </div>
                    <p>Profile</p>
                  </>
                ) : (
                  <NavLink to="/signin-signup">
                    <p>Sign in / Sign up</p>
                  </NavLink>
                )}
              </a>
            </div>
            {/* End .compare-dropdown */}
            <div className="dropdown cart-dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
              >
                <div className="icon">
                  <NavLink to="/cart">
                    <i className="icon-shopping-cart" />
                    {/* <span className="cart-count">2</span> */}
                  </NavLink>
                </div>
                <p>Cart</p>
              </a>
            </div>
            {/* End .cart-dropdown */}
          </div>
          {/* End .header-right */}
        </div>
        {/* End .container */}
      </div>
      {/* End .header-middle */}
      <div className="header-bottom sticky-header">
        <div className="container">
          <div className="header-left"></div>
          {/* End .header-left */}
          <div className="header-center">
            <nav className="main-nav">
              <ul className="menu sf-arrows">
                <li className="menu sf-arrows sf-js-enabled mb-2">
                  {category.categories.length > 0
                    ? renderCategories(category.categories)
                    : null}
                </li>

                {/* <myCategories /> */}
              </ul>
              {/* End .menu */}
            </nav>
            {/* End .main-nav */}
          </div>
          {/* End .header-center */}
          <div className="header-right"></div>
        </div>
        {/* End .container */}
      </div>
      {/* End .header-bottom */}
    </header>
  );
  {
    /* End .header */
  }
}

export default Header;
