import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authSlice from "../reducers/auth";
import categoryReducer from "../reducers/category";
import Products from "../reducers/Products";



const reducers = combineReducers({
  auth: authSlice.reducer,
  products: Products.reducer,
  category: categoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  
  reducer: persistedReducer,
  middleware: [thunk],
});


export default store;


// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()