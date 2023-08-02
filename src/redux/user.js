import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
    signIn: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { signUp, signIn } = user.actions;
export default user;
