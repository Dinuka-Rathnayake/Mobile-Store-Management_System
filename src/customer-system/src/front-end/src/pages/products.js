import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../helpers/axios";
import { productsSlug } from "../reducers/Products";
import { getProductsBySlug } from "../actions/product.action";
import Header from "../common/Header"


/**
 * @author
 * @function ClothingAndAccessories
 **/

function Products(props) {

    // const product = useSelector((state) => state.productsSlug.products);
    // const dispatch = useDispatch();
    const product = []

    useEffect(() => {
       
        getProductsBySlug("Apple-QrRMV4esG");
    }, []);


    return (
        <>
        <Header />
            {/* {product.products.map((product) => ( */}
                <div className="row">
                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="product product-3">
                            <figure className="product-media">
                                <span className="product-label">Sale</span>
                                <Link to={`/${product.slug}/${product._id}/p`}>
                                    <img
                                        //  src={product.productPictures[0].img}
                                        alt="Product image"
                                        className="product-image"
                                    />
                                </Link>
                            </figure>
                            {/* End .product-media */}
                            <div className="product-body">
                                <div className="product-action">
                                    <a href="#" className="btn-product btn-cart">
                                        <span>add to cart</span>
                                    </a>
                                </div>
                                {/* End .product-action */}
                                <div className="product-cat">
                                    <a href="#">Women</a>
                                </div>
                                {/* End .product-cat */}
                                <h3 className="product-title">
                                    <a href="product.html">{product.name}</a>
                                </h3>
                                {/* End .product-title */}
                                <div className="product-price">
                                    <span className="new-price">{product.price}</span>
                                    {/* <span className="old-price">$84.00</span> */}
                                </div>
                                {/* End .product-price */}
                            </div>
                            {/* End .product-body */}
                            <div className="product-footer">
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style={{ width: "40%" }} />
                                        {/* End .ratings-val */}
                                    </div>
                                    {/* End .ratings */}
                                    <span className="ratings-text">( 4 Reviews )</span>
                                </div>
                                {/* End .rating-container */}
                                <div className="product-nav product-nav-thumbs">
                                    <a href="#" className="active">
                                        <img
                                            src="assets/images/products/elements/product-thumb-1.jpg"
                                            alt="product desc"
                                        />
                                    </a>
                                    <a href="#">
                                        <img
                                            src="assets/images/products/elements/product-thumb-2.jpg"
                                            alt="product desc"
                                        />
                                    </a>
                                    <a href="#">
                                        <img
                                            src="assets/images/products/elements/product-thumb-3.jpg"
                                            alt="product desc"
                                        />
                                    </a>
                                </div>
                                {/* End .product-nav */}
                            </div>
                            {/* End .product-footer */}
                        </div>
                        {/* End .product */}
                    </div>
                    {/* End .col-sm-6 col-lg-3 */}
                </div>


            {/* ))} */}
        </>

    );
};







export default Products;