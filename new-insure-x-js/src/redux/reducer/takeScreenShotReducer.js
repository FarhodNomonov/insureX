import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenshot: false,
  screenshotUrl: null,
  appraiser_id: null,
};

export const messagesSlice = createSlice({
  name: "setScreenShot",
  initialState,

  reducers: {
    setScreenShot: (state, action) => {
      state.screenshot = action.payload;
    },
    setScreenShotUrl: (state, action) => {
      state.screenshotUrl = action.payload;
    },
    setAppraiserId: (state, action) => {
      state.appraiser_id = action.payload;
    },
  },
});

export const { setScreenShot, setScreenShotUrl, setAppraiserId } =
  messagesSlice.actions;

export default messagesSlice.reducer;
