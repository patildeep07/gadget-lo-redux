import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Toast
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  currentUser: {},
  status: "idle",
  error: null,
};

// Functions

// 1. Create a new user
export const signup = createAsyncThunk("users/signup", async (userDetails) => {
  try {
    const response = await axios.post(
      "https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/",
      userDetails
    );

    toast.success("Successfully created a new user. Proceed to login");
    return response;
  } catch (error) {
    toast.error("Failed to create user");
  }
});

// 2. Login user
export const login = createAsyncThunk(
  "users/login",
  async (userCredentials) => {
    try {
      const response = await axios.post(
        "https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/login",
        userCredentials
      );

      return response.data;
    } catch (error) {
      toast.error("Failed to log in");
    }
  }
);

// 3. Add to wishlist

export const addToWishlist = createAsyncThunk(
  "users/addToWishlist",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        `https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/${userId}/add-to-wishlist/${productId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// 4. Add to cart

export const addToCart = createAsyncThunk(
  "users/addToCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        `https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/${userId}/add-to-cart/${productId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// 5. Update User details

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, updatedDetails }) => {
    try {
      const response = await axios.post(
        `https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/${userId}/update-user`,
        updatedDetails
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// 6. Remove from wishlist

export const removeFromWishlist = createAsyncThunk(
  "users/removeFromWishlist",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/${userId}/remove-from-wishlist/${productId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// 7. Remove from cart

export const removeFromCart = createAsyncThunk(
  "users/removeFromCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/${userId}/remove-from-cart/${productId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// 8. Place order

export const placeOrder = createAsyncThunk(
  "users/placeOrder",
  async ({ userId }) => {
    try {
      const response = await axios.post(
        `https://d793a5b9-7a02-4879-8f14-4f8b70998e75-00-hyuyw94d5615.global.replit.dev/users/${userId}/place-order`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Creating slice of users

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.currentUser = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    // 1. Login reducers
    // Pending case
    builder.addCase(login.pending, (state, action) => {
      state.status = "loading";
    });

    // Fullfilled case
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.message === "User logged in") {
        state.currentUser = action.payload.user;
        state.isLoggedIn = true;
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }

      state.status = "success";
    });

    // Rejected case
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // #############

    // 2. Add to wishlist
    // Pending case
    builder.addCase(addToWishlist.pending, (state, action) => {
      state.status = "loading";
    });

    // Fulfilled case
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.currentUser.wishlist = action.payload.user.wishlist;
      toast.success(action.payload.message);
    });

    // Rejected case
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // #############

    // 3. Add to cart
    // Pending case
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = "loading";
    });

    // Fulfilled case
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.currentUser.cart = action.payload.user.cart;
      toast.success(action.payload.message);
    });

    // Rejected case
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // #############

    // 4. Remove from wishlist
    // Pending case
    builder.addCase(removeFromWishlist.pending, (state, action) => {
      state.status = "loading";
    });

    // Fulfilled case
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.currentUser.wishlist = action.payload.user.wishlist;
      toast.success(action.payload.message);
    });

    // Rejected case
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // #############

    // 5. Remove from cart
    // Pending case
    builder.addCase(removeFromCart.pending, (state, action) => {
      state.status = "loading";
    });

    // Fulfilled case
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.currentUser.cart = action.payload.user.cart;
      toast.success(action.payload.message);
    });

    // Rejected case
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // ##################

    // 6. Place order
    // Pending case
    builder.addCase(placeOrder.pending, (state, action) => {
      state.status = "loading";
    });

    // Fulfilled case
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.currentUser.cart = [];
      toast.success(action.payload.message);
    });

    // Rejected case
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // ##################

    // 7. Update user
    // Pending case
    builder.addCase(updateUser.pending, (state, action) => {
      state.status = "loading";
    });

    // Fulfilled case
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      toast.success(action.payload.message);
    });

    // Rejected case
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      toast.error(action.payload.error);
    });

    // #############
    // End all cases
  },
});

export const { logout } = UserSlice.actions;
