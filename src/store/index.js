import { createStore } from 'redux';

// reducer function

const counterReducer = (state = { count: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      count: state.count + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      count: state.count - 1,
    };
  }

  return {
    count: state.count,
  };
};

// create store

const store = createStore(counterReducer);

export default store;
