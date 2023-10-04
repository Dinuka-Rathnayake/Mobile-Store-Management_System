import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddProducts.css'
import { v4 } from "uuid";
// import 'firebase/storage';
import {ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage"
import {storage} from "../../firebase";
import Swal from "sweetalert2";

export default function EditProducts({selectId}){

    console.log({selectId})
    const iD = selectId;
    console.log({iD})
    const[id, setID] = useState(iD);
  
    const [product_description, setProductDescription] = useState("");
    const [product_name, setProductName] = useState("");
    // const [product_main_category, setProductMainCategory] = useState("");
    // const [product_sub_category1, setProductSubCategory1] = useState("");
    // const [product_sub_category2, setProductSubCategory2] = useState("");

    const [product_price1, setProductPrice1] = useState("");

    // const [product_new_arrival, setProductNewArrival] = useState("");
    const [product_stock, setProductStock] = useState("");
    const [product_weight, setProductWeight] = useState("");

    const [file, setFile] = useState();
    const [imgUrl, setImgUrl] = useState("");
    const [progresspercent, setProgresspercent] = useState(0);


    const [error,setError]=useState(false);
    const [product, setProduct] = useState([]);
    const [updateProduct, setUpdateProduct] = useState([])

    const [main_category, setMainCategory] = useState("");
    const [sub_category, setSubCategory] = useState("");


    //main category
    var MainCategoryOptions = ["Mobile Phones","Mobile Accessories","Electronic Items","Laptops"];

    //sub categories
    var subCategoryOptions = []
    var MobilePhones = ['Samsung', 'Apple', 'Huawei', 'Google', 'Sony', 'HTC', 'Other'];
    var MobileAccessories = ['HeadPhones', 'Chargers', 'Adapters', 'Data Cables', 'Other'];
    var ElectronicItems = ["Reading Lamps", "Cooling fans", "other"]
    var Laptops = ["Singer", "Mac Book", "other"]

    //choose relevent sub category array according to main category
    switch(main_category) {
        case "Mobile Phones":
            subCategoryOptions = MobilePhones;
            break;

        case "Mobile Accessories":
            subCategoryOptions = MobileAccessories;
            break;

        case "Electronic Items" : 
            subCategoryOptions = ElectronicItems;  
            break;

        case "Laptops" : 
            subCategoryOptions = Laptops;  
            break;
        // default:
          // code block
    }




    //navigate to another path
    const navigate = useNavigate();


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

    
    //get current product details
    useEffect(() => {
        
        axios.get(`http://localhost:8070/product/get/${id}`).then((res) =>{
            console.log(res.data.product)
            setProduct(res.data.product);
            setID(id)

            setProductName(res.data.product.name)
            console.log("quantity"+res.data.product.quantity)
            setProductStock(res.data.product.quantity)
            console.log("description"+res.data.product.description)
            
            console.log("price"+res.data.product.price)
            setProductPrice1(res.data.product.price);
            setProductWeight(res.data.product.weight);

            setMainCategory(res.data.product.mainCategory);            
            setSubCategory(res.data.product.subCategory);

            //product description
            setProductDescription(res.data.product.description);
            var productDescriptionTextArea = document.getElementById("productDescriptionTextArea");
            productDescriptionTextArea.value = res.data.product.description;

            setImgUrl(res.data.product.imgUrl)
            console.log("img url : "+imgUrl)

           // setProductMainCategory(res.data.product.product_main_category);
            // setProductSubCategory1(res.data.product.product_sub_category1);
            // setProductSubCategory2(res.data.product.product_sub_category2);

            // setProductNewArrival(res.data.product.product_new_arrival);

           
            // setProductDiscount(res.data.product.product_discount);


            
            
        }).catch((err) => {
            alert(err.message);
        })
        
        
    
    },[]) 

    


    //check empty
    if (!product) {
        return <div>Loading...</div>;
    }

    console.log("this is name"+product_name);

    //update new product
     function updateDetails(e) {
        e.preventDefault();
        const updateProduct = {
            product_name, product_stock,
            product_weight, product_description,
            product_price1,imgUrl,main_category,sub_category
            
        }
        setUpdateProduct(updateProduct);
        if (!updateProduct) {
            // return <div>Loading...</div>;
            setUpdateProduct(updateProduct);
        }

        console.log(updateProduct)
        
        
        
        // console.log(updateProduct)
        axios.put(`http://localhost:8070/product/update/${id}`,updateProduct).then((res) => {
            
            console.log(id) ;
            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: 'product updated',
                showConfirmButton: false,
                timer: 1500
              })

            // alert("updated!");
            navigate(-1);
        }).catch((err) =>{
            alert(err)
        })
    }

     

    return(
        <div className="container mt-5">
            <div class="form-out">
                <h1>Edit product</h1>
           
                <form onSubmit={updateDetails}>
                    <div className="row g-3 ">

                        <div className="col-md-12">
                            <div className="float-end">
                                <button type="button" className="btn btn-primary " onClick={()=>navigate(-1)}>All Products</button>
                            </div> <br></br>
                        </div>

                        <div className="col-md-6">
                            <label for="name" className="form-label">Product Name</label>  
                            <input type="text" className="form-control" id="name" placeholder="Enter product name.." value={product_name} onChange={(e)=>{
                                setProductName(e.target.value);
                            }} />    
                        </div>
    
                        <div className="col-md-6">
                            <label for="product_stock" className="form-label">Product Stock</label>
                            <input type="number" className="form-control" id="product_stock" placeholder="enter product_stock.." value={product_stock}  onChange={(e) => {
                                setProductStock(e.target.value);
                            }} />
                        </div> 

                        <div className="col-md-6">
                            <label for="product_weight" className="form-label">Product weight</label>
                            <input type="number" className="form-control" id="product_weight" placeholder="enter product_weight.." value={product_weight}  onChange={(e) => {
                                setProductWeight(e.target.value);
                            }} />
                        </div> 

                        {/* <div className="col-md-6">
                            <label for="productMaincategory" className="form-label">Product Main Category</label>
                            <select id="productMaincategory" class="form-select" onChange={(e) => {
                                setProductMainCategory(e.target.value);
                            }}>
                                <option selected value={product_main_category}>{product_main_category}</option>
                                <option value="Computer Accessories">Computer Accessories</option>
                                <option value="Mobile Devices">Mobile Devices</option>
                                <option value="Mobile Accessories">Mobile Accessories</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>  */}

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

                        

                       
                        

                        
                        
                        <div className="col-md-4">
                            <label for="product_price1" className="form-label">Product Price 1</label>
                            <input type="number" className="form-control" id="product_price1" placeholder="enter Product price 1.." value={product_price1} onChange={(e) => {
                                setProductPrice1(e.target.value);
                            }} />
                        </div>

                        {/* Main category */}
                        <div className="col-md-6">
                            <label for="product_price1" className="form-label">Main category </label> <br></br>
                            {error&&main_category.length<=0?
                                <label className="form-error">*main category can't be empty</label>:""
                            }

                            <select className="form-select form-select-md mb-3" aria-label=".form-select-lg example" value={main_category}
                                onChange={(e) => {
                                    setMainCategory(e.target.value);

                                }}
                            >
                                <option selected>-- Open this select menu --</option>
                                {MainCategoryOptions.map((itemName, index) => (
                                    <option key={index} value={itemName}>
                                        {itemName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* sub category */}
                        <div className="col-md-6">
                            <label for="product_weight" className="form-label">Sub Category</label><br></br>
                            {error&&sub_category.length<=0?
                                <label className="form-error">*sub category can't be empty</label>:""
                            }

                            <select className="form-select form-select-md mb-3" aria-label=".form-select-lg example" value={sub_category}
                                onChange={(e) => {
                                    setSubCategory(e.target.value);
                                }}
                            >
                                
                                <option selected>-- Open this select menu --</option>
                                {subCategoryOptions.map((itemName, index) => (
                                    <option key={index} value={itemName}>
                                        {itemName}
                                    </option>
                                ))}
                            </select>
                        </div> 

                        
                        

                        

                        <div className="col-md-6">
                        <label class="form-check-label" for="productDescriptionTextArea">Product Description</label> <br></br>
                            <textarea id="productDescriptionTextArea" className="form-control" rows={3} onChange={(e) => {
                                setProductDescription(e.target.value);
                            }}>{product_description}</textarea>
                        </div>

                        <div className="col-md-6">
                               
                        </div>

                        <div className="col-md-6">
                        <label for="productImage" className="form-label">Product Image <span className="warning-additional">(1600px * 900px)</span></label>
                            <div class="input-group ">
                                <input type="file" class="form-control" id="productImage" onChange={handleProductPictures} />
                                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={handleSubmit} >Upload</button>
                                
                                
                            </div>   
                            {
                                    // !imgUrl &&
                                    <div className='outerbar'>
                                        <div className='innerbar' style={{ width: `${progresspercent}%`,color: "red" }}>{progresspercent}%</div>
                                    </div>
                            }
                            {
                                    imgUrl &&
                                    <img src={imgUrl} alt='uploaded file' height={50} />
                            }
                    
                        </div>

                        <div className="col-md-6">
                            <label for="productImage" className="form-label">Product Image <span className="warning-additional"></span></label>

                            {/* <div className="col-md-2">  */}
                                {
                                    imgUrl &&
                                    <img src={imgUrl} alt='uploaded file' height={200} />
                                }
                            {/* </div> */}
   
                        </div>

                       
                        
                        
                        
                        {/* <div className="col-md-6">
                            <label for="productDiscount" className="form-label">Product Discount</label>
                                <input type="text" className="form-control" id="productDiscount" placeholder="enter product discount.." value={product_discount} onChange={(e) => {
                                    setProductDiscount(e.target.value);
                                }} />
                        </div> */}




                        <div className="col-md-12">
                                <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
} 