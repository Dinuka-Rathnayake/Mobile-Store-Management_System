import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../common/Footer"
import Header from "../common/Header"
import { getApi } from "../utils/axios";

const Home = ()=> {

  const [products, setProducts] = useState([]);
  let ID ;

  // navigate_another_component
  const navigate = useNavigate();

  useEffect(() => {
    function getProducts(){
        getApi().get("api/products/getproducts").then((res)=>{
           // alert(res.data.length);
            setProducts(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
        
    }
    getProducts();
},[])
  // console.log(products)

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  }

    return(
      
        <>
 <Header />
  <main className="main">
    <div className="intro-slider-container mb-5">
      <div
        className="intro-slider owl-carousel owl-theme owl-nav-inside owl-light"
        data-toggle="owl"
        data-owl-options='{
                  "dots": true,
                  "nav": false, 
                  "responsive": {
                      "1200": {
                          "nav": true,
                          "dots": false
                      }
                  }
              }'
      >
        <div
          className="intro-slide"
          style={{
            backgroundImage:
              "url(assets/images/demos/demo-4/slider/slide-1.png)"
          }}
        >
          <div className="container intro-content">
            <div className="row justify-content-end">
              <div className="col-auto col-sm-7 col-md-6 col-lg-5">
                <h3 className="intro-subtitle text-third">
                  Deals and Promotions
                </h3>
                {/* End .h3 intro-subtitle */}
                <h1 className="intro-title">Beats by</h1>
                <h1 className="intro-title">Dre Studio 3</h1>
                {/* End .intro-title */}
                <div className="intro-price">
                  <sup className="intro-old-price">320000</sup>
                  <span className="text-third">
                  299999<sup>.99</sup>
                  </span>
                </div>
                {/* End .intro-price */}
                <a href="category.html" className="btn btn-primary btn-round">
                  <span>Shop More</span>
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
              {/* End .col-lg-11 offset-lg-1 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .intro-content */}
        </div>
        {/* End .intro-slide */}
        <div
          className="intro-slide"
          style={{
            backgroundImage:
              "url(assets/images/demos/demo-4/slider/slide-2.png)"
          }}
        >
          <div className="container intro-content">
            <div className="row justify-content-end">
              <div className="col-auto col-sm-7 col-md-6 col-lg-5">
                <h3 className="intro-subtitle text-primary">New Arrival</h3>
                {/* End .h3 intro-subtitle */}
                <h1 className="intro-title">
                  Apple iPad Pro <br />
                  12.9 Inch, 64GB{" "}
                </h1>
                {/* End .intro-title */}
                <div className="intro-price">
                  <sup>Today:</sup>
                  <span className="text-primary">
                    56000<sup>.99</sup>
                  </span>
                </div>
                {/* End .intro-price */}
                <a href="category.html" className="btn btn-primary btn-round">
                  <span>Shop More</span>
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
              {/* End .col-md-6 offset-md-6 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .intro-content */}
        </div>
        {/* End .intro-slide */}
      </div>
      {/* End .intro-slider owl-carousel owl-simple */}
      <span className="slider-loader" />
      {/* End .slider-loader */}
    </div>
    {/* End .intro-slider-container */}


    {/* <div className="row text-center"> */}
                        
                 <div className="container pr-5">
                          <div className="row text-center"> {/*row justify-content-center*/}
                            {products.map(post => ( 
                                <div className="col-10 col-md-4 mt-5"> 
                                    <div className="card" style={{ width: "18rem" }}>
                                         <img src={post.imgUrl} className="card-img-top" alt="image not found" onClick={()=> handleCardClick(post._id)} />
                                        <div className="card-body" style={{ paddingLeft: "40px" }}>
                                            <h5 className="card-title">
                                                <p style={{ fontWeight: 700, fontFamily: "'Poppins'" }} key={post._id}>{post.name}</p>
                                            </h5>

                                            <p className="card-text">
                                                <p style={{ fontWeight: 500, fontFamily: "'Poppins'" }} key={post._id}>Price : {post.price}</p>
                                            </p>
                                            
                                            

                                            <p key={post._id} >
                                                {/* <button type="button" className="btn btn-primary" onClick={(e) => routeChange(post._id, e)}>Edit</button> */}
                                                
                                                <span>   </span>
                                                {/* <button type="button" className="btn btn-danger" onClick={(e) => deleteRow(post._id, e)}>Delete</button> */}

                                    
                                            </p>
                                        </div>
                                    </div>
                                   
                                
                                </div>   
                            ))
                        } </div>

                        
                    
                </div>
                <Footer />
  
   
             
  </main>
  {/* End .main */}
</>

        

    );
}

export default Home;