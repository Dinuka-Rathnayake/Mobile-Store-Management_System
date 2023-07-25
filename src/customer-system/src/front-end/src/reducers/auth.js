import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
        userId: '',
        userName: '',
        email: '',
        //picture: '',
        role: ''
    },
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    login(state, action) {
        const token = action.payload;
  
        const tokenPayload = jwt(token);
  
        state.isLoggedIn = true;
        state.user.userId = tokenPayload.userId;
        state.user.userName = tokenPayload.name;
        state.user.email = tokenPayload.email;
        state.user.role = tokenPayload.role;
        state.token = token;
    },
    // login(state, action) {
    //   const token = action.payload;

    //   const tokenPayload = jwt(token);

    //   state.isLoggedIn = true;
    //   state.userId = tokenPayload.userId;
    //   state.sid = tokenPayload.sid;
    //   state.userName = tokenPayload.firstName;
    //   state.userType = tokenPayload.type;
    //   state.userStatus = tokenPayload.userStatus;
    //   state.token = token;
    // },
    logout(state, action) {
        state.isLoggedIn = false;
        state.user.userId = null;
        state.user.userName = null; 
        state.user.email = null;
        state.user.role = null;
        state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;