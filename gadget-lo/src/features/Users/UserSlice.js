import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Toast
import { toast } from "react-toastify";

const initialState = {
  allUsers: {},
  currentUser: {},
  loading: false,
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
    console.log(response);
  } catch (error) {
    toast.error("Failed to create user");
  }
});

// Creating slice of users

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
