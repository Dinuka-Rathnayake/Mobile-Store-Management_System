import React,{useState, useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import EditProducts from "./EditProducts";



export default function AllProducts({setId}){


    const [products, setProducts] = useState([]);
    const [items, setItems] = useState(products);
    
    // console.log(items)

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    let ID ;
    // console.log(searchQuery)

    // navigate_another_component
    const navigate = useNavigate();

    // read_products
    useEffect(() => {
        function getStudents() {
            axios.get("http://localhost:8070/product/").then((res) =>{
                setProducts(res.data);
                setItems(res.data)
                 console.log(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getStudents();
        
    }, [])

    
    
    
    
    //search products
    const handleSearch = (event) => {

        setSearchQuery(event.target.value)
        var searchword = event.target.value;
        console.log("Search word =" + searchword)

        var searchwordLenth = (parseInt(searchword.length)) 

        console.log("search word length = "+ searchwordLenth)

        if(searchwordLenth > 2){
            
                axios.get(`http://localhost:8070/product/search?q=${searchQuery}`).then((response)=>{
                    setSearchResults(response.data);
                    setItems(response.data)
                }).catch ((error)=> {
            console.error("Error searching:", error);
            })
        }
        if(searchwordLenth < 2){
            setItems(products)
        }
        else{
            setItems(products)
        }   
    };
    // console.log(searchResults)
    console.log("item length is "+items.length)
    // if(searchQuery.length != 0 && items.length != 0){
     
    // }


    
    // delete_product
    function deleteRow(id, e){
        e.preventDefault();

        

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                     axios.delete(`http://localhost:8070/product/delete/${id}`).then(res => 
                    console.log('Deleted!!!', res)).catch(err => console.log(err))
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                 // reload page after delete
                window.location.reload(true); 
                }
              })

           
    }

    // navigate to edit product
    const routeChange = (id, e) =>{
        
        setId(id);
        // alert(id);
        
        const path = "edit/"
        navigate(path)

    }

   


    //  export to pdf
    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Quantity Report";
        const headers = [["NAME", "QUANTITY"]];

        const data = products.map(elt=> [elt.name, elt.quantity]);

        const content = {
            startY: 50,
            head: headers,
            body: data
          };
      
          doc.text(title, marginLeft, 40);
          doc.autoTable(content);
          doc.save("report.pdf")


    }
    

    return(
        <div className="container">
            <h1>All products</h1>
            
            <div className="row g-3 ">
                <div className="col-md-8">
                    <button className="btn btn-primary" onClick={()=> navigate("add")}>Add New</button> <span>  </span>
                    <button className="btn btn-primary" onClick={() => exportPDF()}>Generate Report</button>
                </div>
                <div className="col-md-4">
                    <form className="d-flex">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchQuery(
                            e.target.value
                            
                        )}/> */}
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>

                        <button className="btn btn-outline-success" type="button" onClick={()=> handleSearch()} >Search</button>
                    </form>
                </div>
            </div>
            {/* <table className="table table-success table-striped" style={{fontSize : "32px"}} >
                        
                        <th>Product name</th>
                        <th>Product description</th>
                        <th>Product Stock</th>
                        <th>Action</th>
                        

                        <tr style={{fontSize : "32px"}}>
                            <td>
                                {products.map(post => ( 
                                    <p key={post._id}>{post.name}</p>
                                ))}
                            </td>

                            <td>
                                {products.map(post => ( 
                                    <p key={post._id}>{post.description}</p>
                                ))}
                            </td>

                        
                                
                            <td>
                                {products.map(post => ( 
                                    <p key={post._id}>{post.quantity}</p>
                                ))}
                            </td>

                            

                         

                            <td>
                                 {products.map(post => ( 
                                    <p key={post._id} >
                                        
                                        
                                        <button type="button" className="btn btn-primary" onClick={(e) => routeChange(post._id, e)}>Edit</button>
                                        
                                        <span>   </span>
                                        <button type="button" className="btn btn-danger" onClick={(e) => deleteRow(post._id, e)}>Delete</button>

                                        
                                    </p>

                                ))}
                            
                            </td>

                        </tr>
            </table> */}
                    <div className="allDisplayProducts" id ="allDisplayProducts">
                        <div className="row text-center">
                        
                            {
                                items.map(post => ( 
                                    <div className="col-10 col-md-4 mt-5"> 

                                        <div className="card h-100" style={{ width: "18rem" }}>
                                             <img src={post.imgUrl} className="card-img-top" alt="not found" />

                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <p key={post._id}>{post.name}</p>
                                                </h5>

                                                <p className="card-text">
                                                    <p key={post._id}>Quantity : {post.quantity}</p>
                                                </p>
                                                
                                                <p className="card-text">
                                                    <p key={post._id}>Unit Price : Rs.{post.price}</p>
                                                </p>

                                                <p key={post._id} >
                                                    
                                                    
                                                    
                                                    <button type="button" className="btn btn-danger" onClick={(e) => deleteRow(post._id, e)}>Delete</button>
                                                    <span>   </span>
                                                    <button type="button" className="btn btn-primary" onClick={(e) => routeChange(post._id, e)}>Edit</button>

                                        
                                                </p>
                                            </div>
                                        </div>
                                       
                                    
                                    </div>    
                                ))
                            }

                            
                        
                        </div>
                    </div>
                </div>
        
        

        

    )
}