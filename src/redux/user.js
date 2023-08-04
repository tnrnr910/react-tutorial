import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
    },
    unsetUser: (state) => {
      state.email = null;
    },
  },
});

export const { setUser, unsetUser } = user.actions;
export default user;
