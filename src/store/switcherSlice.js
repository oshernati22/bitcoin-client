import { createSlice } from "@reduxjs/toolkit";

const switcherSlice = createSlice({
  name: "switcher",
  initialState: { switcher: false },
  reducers: {
    changeMode(state, action) {
      state.switcher = !state.switcher;
    },
  },
});

export const switcherActions = switcherSlice.actions;
export default switcherSlice;
