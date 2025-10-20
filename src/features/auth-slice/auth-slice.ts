import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("jwt");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: tokenFromStorage || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("jwt", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jwt");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
