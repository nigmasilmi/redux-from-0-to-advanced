import { configureStore, createSlice } from '@reduxjs/toolkit';

// reducer function
const initialState = { count: 0, showCounter: true };

// creating slices
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    increase(state, action) {
      state.count = state.count + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// create store
// const store = createStore(counterSlice.reducer);
const store = configureStore({
  reducer: counterSlice.reducer,
});
// access the actions
export const counterActions = counterSlice.actions;
export default store;
