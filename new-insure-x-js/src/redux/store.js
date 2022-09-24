import { configureStore } from "@reduxjs/toolkit";
import user from "./reducer/user";
import messages from "./reducer/messages";

export default configureStore({
  reducer: {
    user,
    messages,
  },
});
