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
      "https://backend-gadget-lo.patildeep07.repl.co/users/",
      userDetails
    );

    toast.success("Successfully created a new user. Proceed to login");
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
        "https://backend-gadget-lo.patildeep07.repl.co/users/login",
        userCredentials
      );

      return response.data;
    } catch (error) {
      toast.error("Failed to log in");
    }
  }
);

// Creating slice of users

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
    // End all cases
  },
});
