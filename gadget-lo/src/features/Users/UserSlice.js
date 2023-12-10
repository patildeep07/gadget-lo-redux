import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

// Creating slice of users

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
