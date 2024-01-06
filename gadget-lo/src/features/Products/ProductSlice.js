import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Toast
import { toast } from "react-toastify";

const initialState = {
  allProducts: [],
  status: "idle",
  error: null,
};

// Functions

// 1. Get all products

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://gadget-lo.onrender.com/products/"
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

// Creating slice of products

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 1. Get all products
    // Loading
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.status = "loading";
    });

    // Successful
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.allProducts = action.payload.products;
    });

    // Rejected
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      toast.error("Failed to retrieve products");
    });

    // End extra reducers
  },
});
