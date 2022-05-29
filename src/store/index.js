import { configureStore, createSlice } from "@reduxjs/toolkit";

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

const authInitialState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "authentication",
  initialState: authInitialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
