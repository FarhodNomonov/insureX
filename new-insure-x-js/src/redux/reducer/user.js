import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    lang: "hebrew",
    new_massage: false,
    role: ["customer", "agent", "sdp", "appraiser"].includes(
      localStorage.getItem("role")
    )
      ? localStorage.getItem("role")
      : 'none',
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setNewMessage: (state, { payload }) => {
      state.new_massage = payload;
    },
    setLang: (state, { payload }) => {
      state.lang = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
  },
});
export const { setUser, setNewMessage, setLang, setRole } = userSlice.actions;
export default userSlice.reducer;
