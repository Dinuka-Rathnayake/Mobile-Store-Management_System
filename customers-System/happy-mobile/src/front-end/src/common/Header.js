import React, { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { authActions } from "../reducers/auth";

import { getAllCategory } from '../actions/category.action';
import { getProductsBySlug } from '../actions/product.action';


function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const category = useSelector(state => state.category); 

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);


  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(

        <li key={category.name}>
          {
            category.parentId ? <a href={`/${category.slug}?cid=${category._id}`}> {category.name} </a> : <span className="sf-with-ul">{category.name}</span>
          }
           {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }
    return myCategories;
  }



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
              <img src="assets/images/demos/demo-4/logo.png" alt="Molla Logo" width={105} height={25} />
            </a>
          </div>{/* End .header-left */}
          <div className="header-center">
            <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
              <a href="#" className="search-toggle" role="button"><i className="icon-search" /></a>
              <form action="#" method="get">
                <div className="header-search-wrapper search-wrapper-wide">
                  <label htmlFor="q" className="sr-only">Search</label>
                  <button className="btn btn-primary" type="submit"><i className="icon-search" /></button>
                  <input type="search" className="form-control" name="q" id="q" placeholder="Search product ..." required />
                </div>{/* End .header-search-wrapper */}
              </form>
            </div>{/* End .header-search */}
          </div>
          <div className="header-right">
            


                {/* (<p onClick={() => {
                    dispatch(authActions.logout());
                    navigate("/");
                  }} >Signout</p>) */}
           
            <div className="wishlist">
              <a href="" title="Wishlist">
                
                {isLoggedIn ? (<><div className="icon"><NavLink to ="/profile" >
                  <i className="bi bi-person-circle" /></NavLink>
                </div><p>Profile</p></>)  : (<NavLink to="/signin-signup" ><p>Sign in / Sign up</p></NavLink>)}
              </a>
            </div>{/* End .compare-dropdown */}
            <div className="dropdown cart-dropdown">
              <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                <div className="icon"><NavLink to="/cart">
                  <i className="icon-shopping-cart" />
                  {/* <span className="cart-count">2</span> */}
                  </NavLink>
                </div>
                <p>Cart</p>
              </a>
             
            </div>{/* End .cart-dropdown */}
          </div>{/* End .header-right */}
        </div>{/* End .container */}
      </div>{/* End .header-middle */}
      <div className="header-bottom sticky-header">
        <div className="container">
          <div className="header-left">
           
          </div>{/* End .header-left */}
          <div className="header-center">
            <nav className="main-nav">
              <ul className="menu sf-arrows">
                
  
               
               
      <li className='menu sf-arrows sf-js-enabled mb-2'>
        {category.categories.length > 0 ? renderCategories(category.categories) : null}
      </li>
    

                {/* <myCategories /> */}


              </ul>{/* End .menu */}
            </nav>{/* End .main-nav */}
          </div>{/* End .header-center */}
          <div className="header-right">
            
          </div>
        </div>{/* End .container */}
      </div>{/* End .header-bottom */}
    </header>); {/* End .header */ }






}

export default Header;