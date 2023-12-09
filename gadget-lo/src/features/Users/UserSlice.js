import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: {},
  currentUser: {},
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
