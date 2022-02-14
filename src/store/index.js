import { createStore } from 'redux';

// reducer function
const initialState = { count: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    return {
      count: state.count + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'decrement') {
    return {
      count: state.count - 1,
      showCounter: state.showCounter,
    };
  }

  // expecting a payload
  if (action.type === 'increase') {
    return {
      count: state.count + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'toggle') {
    return {
      count: state.count,
      showCounter: !state.showCounter,
    };
  }

  return {
    count: state.count,
  };
};

// create store

const store = createStore(counterReducer);

export default store;
