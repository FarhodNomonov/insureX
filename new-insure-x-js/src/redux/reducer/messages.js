import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const messagesSlice = createSlice({
  name: "clientMessages",
  initialState,
  reducers: {
    setMessage: (state, { payload }) => {
      return payload;
    },
    clearMessage: (state) => {
      return initialState;
    },
  },
});

export const { setIsloading, clearMessage, setMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
