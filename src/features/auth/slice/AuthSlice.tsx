import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "",
    user: null,
    email: "",
  },
  reducers: {
    login: (state, action) => {
      const payload = action.payload;
      state.role = payload.role;
      state.user = payload.user;
      state.email = payload.email;
    },
    logout: (state) => {
      state.user = null;
      state.role = "";
      state.email = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
