import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/Users/UserSlice";

export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
  },
});
