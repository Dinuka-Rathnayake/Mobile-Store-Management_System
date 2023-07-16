import React, { useState, useEffect } from "react";
import { popAlert } from "../../utils/alert";

const { getApi } = require("../../utils/axios");



function CategoryCreate() {

    const [categories, setCategories] = useState([])
    const [catName,setCatName] = useState("");
    const [parentId,setParentId] = useState("");

    useEffect(()=> {
        function getCategories(){
            getApi().get("api/category/getcategory").then((res)=>{
                console.log(res.data);
                setCategories(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getCategories();
    },[])


    const newCategory = (e) =>{
        e.preventDefault();

        getApi()
            .post("api/admin/orders",{
                name: catName,
                parentId: parentId,
            }).then((res)=> {
                popAlert("Success!",
                "You have successfully added the Category!",
                "success",
                "Ok");
               // navigate("/");
            }).catch((err) =>{
                popAlert("Error!", err.response.data.message, "error", "Ok");
                console.error(err);
         });
    };




    return (

        <form>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Email address</label>
    <input
      type="email"
      className="form-control"
      id="exampleFormControlInput1"
      placeholder="name@example.com"
    />
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Example select</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
</form>




    );
}

export default CategoryCreate;