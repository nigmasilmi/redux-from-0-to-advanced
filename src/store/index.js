import { configureStore, createSlice } from '@reduxjs/toolkit';
// initial states

const initialCounterState = { count: 0, showCounter: true };
const initialAuthState = { isAuthenticated: false };

// creating slices

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
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
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});
// access the actions
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
