import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/Users/UserSlice";
import { ProductSlice } from "../features/Products/ProductSlice";

export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    products: ProductSlice.reducer,
  },
});
