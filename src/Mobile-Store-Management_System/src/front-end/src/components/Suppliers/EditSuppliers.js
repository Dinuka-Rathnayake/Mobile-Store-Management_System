import React,{useState, useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation, useParams } from "react-router-dom";
import './Addsuppliers.css'

export default function EditSuppliers(selectId){

    const [SupplierDetails, SetSupplierDetails] = useState([])

    

    console.log({selectId})
    const iD = selectId;
    console.log({iD})
    const[id, setID] = useState(iD);



    const [SupplierId, setSupplierId]=useState("");
    const [SupplierName, setSupplierName]=useState("");
    const [Email, setEmail]=useState("");
    const [PhoneNumber, setPhoneNumber]=useState("");
    const [SupplierAddress, setSupplierAddress]=useState("");
    const [ItemType1, setItemType1]=useState("");
    const [ItemType2, setItemType2]=useState("");
    const [ItemType3, setItemType3]=useState("");
    

    const {state} = useLocation()
    useEffect(() => {
        
        axios.get(`http://localhost:8070/supplier_details/get_supplier_details/${state}`).then((response) =>{
            SetSupplierDetails(response.data)
        
        /*  console.log(res.data.SupplierDetails)
            SetSupplierDetails(res.data.SupplierDetails);
            setID(id)
            console.log(res.data.SupplierDetails.SupplierId)

            setSupplierId(res.data.SupplierDetails.SupplierId)         
            setSupplierName(res.data.SupplierDetails.SupplierName)
            setEmail(res.data.SupplierDetails.Email)
            setPhoneNumber(res.data.SupplierDetails.PhoneNumber)
            setSupplierAddress(res.data.SupplierDetails.SupplierAddress);

            setItemType1(res.data.SupplierDetails.ItemType1);
            setItemType2(res.data.SupplierDetails.ItemType2);
            setItemType3(res.data.SupplierDetails.ItemType3); */
            
        }).catch((err) => {
            alert(err.message);
        })
    },[]) 


    const [checked,setChecked] = useState(true)

    const handleChange=(event)=>{
        setChecked(event.target.checked)

}

const updateHandler=async()=>{
axios.put(`http://localhost:8060/supplier_details/update_supplier_details/${id}` ,{


            /* const [SupplierId,setSupplierId]=useState('')
            const [SupplierName,setSupplierName]=useState('')
            const [Email,setEmail]=useState('')
            const [PhoneNumber,setPhoneNumber]=useState('')
            const [SupplierAddress,setSupplierAddress]=useState('')
            const [ItemType1,setItemType1]=useState('')
            const [ItemType2,setItemType2]=useState('')
            const [ItemType3,setItemType3]=useState('') */
        
               
        SupplierId: String(SupplierDetails.SupplierId),
        SupplierName: String(SupplierDetails.SupplierName),
        Email: String(SupplierDetails.Email),
        PhoneNumber: String(SupplierDetails.PhoneNumber),
        SupplierAddress: String(SupplierDetails.SupplierAddress),
        ItemType1: String(SupplierDetails.ItemType1),
        ItemType2: String(SupplierDetails.ItemType2),
        ItemType3: String(SupplierDetails.ItemType3)
    }).then((response=>response.data && alert("Successfully updated!"))).catch((err)=>{
        alert("Something went wrong!")
    })

}

    return(
        <div className="container mt-5" >

            <div className="form-out">
                <h1>Edit Supplier</h1>
                

                <form>
                    <div className="row g-3 ">

                        {/* <div className="col-md-12">
                            <div className="float-end">
                                <button type="button" className="btn btn-primary " onClick={()=>navigate("supplierList")}>All Suppliers</button>
                            </div> <br/>
                        </div> */}

                        <div className="col-md-6">
                            <h4>Supplier ID</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Create Supplier ID.." value={SupplierId} onChange={(e)=>{
                                setSupplierId(e.target.value);
                            }} />    
                        </div>

                        <div className="col-md-6">
                            <h4>Supplier Name</h4>  
                            <input type="text" className="form-control" id="code" placeholder="Enter Supplier Name.." value={SupplierName} onChange={(e)=>{
                                setSupplierName(e.target.value);
                            }} />    
                        </div>
                        
                        {/* <div class="col-md-6">
                            <h4>Password</h4>
                            <input type="text" className="form-control" id="code" placeholder="Enter product code.." onChange={(e)=>{
                                setPassword(e.target.value);
                            }} />    
                        </div> */}

                        <div className="col-md-6">
                            <h4>Email</h4>
                            <input type="email" className="form-control" id="product_stock" placeholder="Enter Supplier Email.." value={Email} onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        </div> 

                        <div className="col-md-6">
                            <h4>Phone Number</h4>
                            <input type="number" className="form-control" id="product_weight" placeholder="Enter Supplier Phone Number.." value={PhoneNumber} onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }} />
                        </div> 

                        <div className="col-md-12">
                            <h4>Address</h4>
                            <input type="text" className="form-control" id="product_weight" placeholder="Enter Supplier Address.." value={SupplierAddress} onChange={(e) => {
                                setSupplierAddress(e.target.value);
                            }} />
                        </div> 

                        {/* <div className="col-md-6">
                            <h4 for="inlineRadioOptions" className="form-label">Items </label> <br></br>
                            <input type="number" className="form-control" id="product_weight" placeholder="enter product_weight.." onChange={(e) => {
                                setItemType1(e.target.value);
                            }} />  
                        </div>
                         */}
                         

                        <div className="col-md-4">
                            <h4>Product Category 1</h4>
                            <select id="productSubcategory1" className="form-select" onChange={(e) => {
                                setItemType1(e.target.value);
                            }}>
                                <option selected value="none">--select category--</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="other">other</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <h4>Product Category 2</h4>
                            <select id="productSubcategory1" className="form-select" onChange={(e) => {
                                setItemType2(e.target.value);
                            }}>
                                <option selected value="none">--select category--</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="other">other</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <h4>Product Category 3</h4>
                            <select id="productSubcategory1" className="form-select" onChange={(e) => {
                                setItemType3(e.target.value);
                            }}>
                                <option selected value="none">--select category--</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="other">other</option>
                            </select>
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
