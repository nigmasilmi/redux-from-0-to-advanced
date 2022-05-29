import { createSlice } from "@reduxjs/toolkit";

const ceroCounterState = {
  counterNumber: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: ceroCounterState,
  reducers: {
    increment(state) {
      state.counterNumber++;
    },
    decrement(state) {
      state.counterNumber--;
    },
    increase(state, action) {
      state.counterNumber = state.counterNumber + action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice;
