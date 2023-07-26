import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddProducts.css'
import { v4 } from "uuid";
// import 'firebase/storage';
import {ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage"
import {storage} from "../../firebase";
import "jspdf-autotable";
import Swal from "sweetalert2";



export default function AddProducts(){

    
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_stock, setProductStock] = useState("");
    const [product_weight, setProductWeight] = useState("");
    const [product_price1, setProductPrice1] = useState("");
    const [main_category, setMainCategory] = useState("");
    const [sub_category, setSubCategory] = useState("");

    const [file, setFile] = useState();
    const [imgUrl, setImgUrl] = useState("");
    const [progresspercent, setProgresspercent] = useState(0);

    const [error,setError]=useState(false);

    // const [product_sub_category1, setProductSubCategory1] = useState("");
    // const [product_sub_category2, setProductSubCategory2] = useState("");
    // const [product_new_arrival, setProductNewArrival] = useState("");
    // const [product_discount, setProductDiscount] = useState("");
   
    
    

    //navigate to another path
    const navigate = useNavigate();

    


    //create addfunction
    function sendData(e) {

        e.preventDefault();
        
        // var productMaincategory = document.getElementById('productMaincategory');
        // var productMaincategoryValue = productMaincategory.value;
        // setProductMainCategory(productMaincategoryValue);
        
        //validation part
        if(
            product_name.length==0||product_description.length==0||product_stock.length==0
            ||product_price1.length==0||imgUrl
            ){
            setError(true)
        }

        if(product_name&&product_description&&product_stock&&product_price1&&imgUrl)
        {
        console.log("name: ",product_name,"\ndescription: ",product_description)

        
        
        
            //set new objects


            const newProduct = {
                product_name, product_stock,
                product_weight, product_description, 
                imgUrl, product_price1,
                main_category, sub_category
                

            }
            console.log("this is weight "+newProduct.product_name);

            //send data to backend
            axios.post("http://localhost:8070/product/add", newProduct).then(() => {
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'product added',
                    showConfirmButton: false,
                    timer: 1500
                })
                // alert('product added');
                navigate(-1);
                
            }).catch((err) =>{
                alert(err)
            })
        
        }

    }    

    //handle image change
    const handleProductPictures = (e) =>{
        setFile(
            // ...imageUpload,
            e.target.files[0]
        ); 
      }
      console.log(file);

    
    //upload image3
    const handleSubmit = (e) => {
        e.preventDefault();

        if(file == null) return;
        const imageId = file.name + v4();

        const storageRef = ref(storage, `images/product/${imageId}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
            
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgUrl(downloadURL)
              Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: 'Image Uploaded',
                showConfirmButton: false,
                timer: 1500
              })
            //   alert("Uploded");
            });
          }
        );
      }


      

    

    return(
        <div className="container mt-5" >

            <div class="form-out">
                <h1>Add new product</h1>
                

                <form  onSubmit={sendData}>
                    <div className="row g-3 ">

                        <div className="col-md-12">
                            <div className="float-end">
                                <button type="button" className="btn btn-primary " onClick={()=>navigate(-1)}>All Products</button>
                            </div> <br></br>
                        </div>

                        <div className="col-md-6">
                            <label for="code" className="form-label">Product Name</label>  <br></br>
                            {error&&product_name.length<=0?
                            <label className="form-error">*Product name can't be empty</label>:""
                            }
                            <input type="text" className="form-control" id="code" placeholder="Enter product name.." onChange={(e)=>{
                                setProductName(e.target.value);
                            }} />    
                        </div>
                        
                        
                        

                        <div className="col-md-6">
                            <label for="product_quantity" className="form-label">Product Quantity</label><br></br>
                            {error&&product_stock.length<=0?
                            <label className="form-error">*Product stock can't be empty</label>:""
                            }
                            <input type="number" className="form-control" id="product_quantity" placeholder="enter product_quantity.." onChange={(e) => {
                                setProductStock(e.target.value);
                            }} />
                        </div> 

                        {/* weight     */}
                        <div className="col-md-6">
                            <label for="product_weight" className="form-label">Product weight</label>
                            
                            <input type="number" className="form-control" id="product_weight" placeholder="enter product_weight.." onChange={(e) => {
                                setProductWeight(e.target.value);
                            }} />
                        </div> 

                        {/* price */}
                        <div className="col-md-6">
                            <label for="product_price1" className="form-label">Product Price </label> <br></br>
                            {error&&product_price1.length<=0?
                            <label className="form-error">*Product price can't be empty</label>:""
                            }
                            <input type="number" className="form-control" id="product_price1" placeholder="enter Product price 1.." onChange={(e) => {
                                setProductPrice1(e.target.value);
                            }} />
                        </div>

                        {/* Main category */}
                        <div className="col-md-6">
                            <label for="product_price1" className="form-label">Main category </label> <br></br>
                            {error&&product_price1.length<=0?
                            <label className="form-error">*Product price can't be empty</label>:""
                            }
                            <input type="text" className="form-control" id="product_price1" placeholder="enter main category.." onChange={(e) => {
                                setMainCategory(e.target.value);
                            }} />
                        </div>

                        {/* sub category */}
                        <div className="col-md-6">
                            <label for="product_weight" className="form-label">sub category</label>
                            
                            <input type="text" className="form-control" id="product_weight" placeholder="enter sub category.." onChange={(e) => {
                                setSubCategory(e.target.value);
                            }} />
                        </div> 

                        


                        


                        {/* discription     */}
                        <div className="col-md-6">
                        <label class="form-check-label" for="productDescriptionTextArea">Product Description</label> <br></br>
                        {error&&product_description.length<=0?
                            <label className="form-error">*Description can't be empty</label>:""
                        }<br></br>
                            <textarea id="productDescriptionTextArea" className="form-control" rows={3} onChange={(e) => {
                                setProductDescription(e.target.value);
                            }}></textarea>
                        </div>


                        


                        {/* <div className="col-md-6">
                            <label for="inlineRadioOptions" className="form-label">New Arrival  </label> <br></br>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="yes" onChange={(e) => {
                                    setProductNewArrival(e.target.value);
                                }}/>
                                <label class="form-check-label" for="inlineRadio1">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="no" onChange={(e) => {
                                    setProductNewArrival(e.target.value);
                                }}/>
                                <label class="form-check-label" for="inlineRadio2">No</label>
                            </div>
                        </div> */}

                        

                        

                        {/* <div className="col-md-6">
                            <label for="productDiscount" className="form-label">Product Discount</label>
                                <input type="text" className="form-control" id="productDiscount" placeholder="enter product discount.." onChange={(e) => {
                                    setProductDiscount(e.target.value);
                                }} />
                        </div> */}
                        
                        {/* image */}
                        <div className="col-md-6">
                            <label for="productImage" className="form-label">Product Image <span className="warning-additional">(1600px * 900px)</span></label><br></br><br></br> 
                            {error&&imgUrl.length<=0?
                            <label className="form-error">*Product image didn't uploaded</label>:""
                            }
                            <div class="input-group ">
                                <input type="file" class="form-control" id="productImage" onChange={handleProductPictures} />
                                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={handleSubmit}>Upload</button>
                                
                                
                            </div>
                                {
                                    !imgUrl &&
                                    <div className='outerbar'>
                                        <div className='innerbar' style={{ width: `${progresspercent}%`,color: "red" }}>{progresspercent}%</div>
                                    </div>
                                }
                                {
                                    imgUrl &&
                                    <img src={imgUrl} alt='uploaded file' height={50} />
                                }



                        </div>
                        
                        
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>


                    </div>
  
                </form>
                    
                    
            </div>
 
        </div>
    )
}