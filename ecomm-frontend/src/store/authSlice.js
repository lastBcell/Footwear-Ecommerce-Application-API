import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        token:null
    },
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload;
        },
         setToken: (state,action)=>{
            state.token = action.payload;
        },
        removeUser: (state)=>{
            state.user = null;
            state.token = null;
        },
    }
});

export const {setUser, removeUser,setToken} = authSlice.actions

export default authSlice.reducer;