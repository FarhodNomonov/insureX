import { configureStore } from "@reduxjs/toolkit";
import user from "./reducer/user";

export default configureStore({
  reducer: {
    user,
  },
});
