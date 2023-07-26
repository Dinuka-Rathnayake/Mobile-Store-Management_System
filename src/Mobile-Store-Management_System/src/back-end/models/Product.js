//1.import mongoose package
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const subCategorySchema = new mongoose.Schema({
//     name: {
//       type: String
     
//     }
//   });


const productSchema = new Schema({

    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        // required: true, 
        // unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
    },
    
    //imageUrL
    imgUrl : {
        type : String,
        // required: true,
    },

    //category
    mainCategory : {
        type : String,
        required : true
    },
    subCategory : {
        type : String,
        // default: [],
    },
    updatedAt: Date,

    
    
    // product_main_category : {
    //     type : String
    //     // required : true
    // },
    // product_sub_category1 : {
    //     type : String
    //     // default: [],
        
    // },
    // product_sub_category2 : {
    //     type : String
        
    // },
    // product_capacity1 : {
    //     type : Number
        
    // },
    // product_color1 : {
    //     type : String
        
    // },
    // product_price1 : {
    //     type : Number
    //     // required : true
    // },
    // product_capacity2 : {
    //     type : Number
        
    // },
    // product_color2 : {
    //     type : String
        
    // },
    // product_price2 : {
    //     type : Number
        
    // },
    // product_capacity3 : {
    //     type : Number
        
    // },
    // product_color3 : {
    //     type : String
        
    // },
    // product_price3 : {
    //     type : Number
        
    // },
    // product_new_arrival : {
    //     type : String
        
    // },
    // product_stock : {
    //     type : Number
        
    // },
    // product_weight : {
    //     type : Number
        
    // },
    // product_discount : {
    //     type : Number
        
    // },
    // product_seo_description : {
    //     type : String
        
    // },
    
    // image upload
    // productPictures : [
    //         {img : {type : String}}    
    // ]

    


}, { timestamps: true })

// 

//added this line for solve error
mongoose.models = {};

//edited
const Product =  mongoose.model.Product || mongoose.model('Product', productSchema); 
module.exports = Product;