import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    signUp: (state, action) => {
      state.users.push(action.payload);
      state.isLoggedIn = true;
      state.token = "static-token";
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
  },
});

export const { signUp, login } = authSlice.actions;

export default authSlice.reducer;
