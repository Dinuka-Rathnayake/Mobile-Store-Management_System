import { createSlice } from "@reduxjs/toolkit";

const Products = createSlice({
    name:"products",
    initialState: {
        Products:[]

    },
    reducers: {
        getProductsSlug(state, action) {
            state.Products = action.payload.products
        }
    }
});

export const productsSlug = Products.actions; //actins

export default Products; //state