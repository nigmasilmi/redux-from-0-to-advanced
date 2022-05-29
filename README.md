# Vanilla

## Creating

Create store with createStore from redux, pass a simple reducer

Connect the components to the store, providing the store to the App

## Providing

- in index.js (the highest level we can go)(or, in other cases if needed in just a group of components)
- import from react-redux, the Provider componet
- wrap the root component with Provider
- specify the store we want to provide

## Use the provided state

- use the hook to access: useSelector from react-redux (functional component)
- connect (class based components)
- useSelector receives a function to select which piece of the store we are needing `const counter = useSelector((state) => state.counter);`
- useSelector by default creates a subscription so, if that piece of state changes, the component is re evaluated and rendered

## Dispatching actions

- use the hook: useDispatch(), with no arguments, that returns a function that we can use to dispatch actions

## Wiring up redux with class-based components

- export the class with hoc connect, which executes and returns a function in which we pass the class component as argument
- connect needs 2 arguments, which are functions that we must declare in the component
- the first one maps the state to props
- the second one maps the dispatcher to props

```js
const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterClass);
```

## Correct use of the returned state in the Reducer

- out of the box, with just plain Redux, the pieces of state doesn't merge, so always take into account all the pieces of state when returning
- never mutate the state, return a new one

## Redux challenges

- types must be managed as constants to avoid mistyping
- pieces states can and must be separated and the combine the reducers into a single one
- enhancers are recommended to manage middlewares and dev tools to debug the store
- all those challenges are no loger "so challenging" by using Redux Toolkit

# Redux Toolkit

[go](https://redux-toolkit.js.org/)

- `npm i @reduxjs/toolkit`
- if the project already has the redux library, uninstall because RTK has it already

## Refactor

- in index.js of the store, import configureStore from @reduxjs/toolkit
  <small> <br />
  "(We recommend using the configureStore method of the @reduxjs/toolkit package, which replaces createStore.)"</small><br />
  `const store = configureStore(counterReducer);`

- in index.js of the store, import createSlice from RTK

## Adding State Slices

- slices are parts of the state which refers to different business logic (although is up to us)

```js
createSlice({
  // this name  creates a unique identifier for RTK
  // this is not the name we use when working with useSelector
  name: "counter",
  initialState: ceroState,
  reducers: {
    increment(state) {}, // will receive the action also, but
    decrement(state) {}, // we use it only when needed
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
```

- with RTK, this is valid

```js
 increment(state) {
   state.counter++
 }
```

why? because RTK calls a sub library called immer which in turn clones the state and ensures its unmmutable nature

## How to use the slice?

- register the slice with configureStore and pass a configuration object

```js
const store = configureStore({
  reducer: { counterSlice },
});
```

- or if we had multiple slices of the global state:

```js
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});
```

## How do we dispatch actions?

- with the use of createSlice(), RTK generates automatically an action object based on the method options
- we access them by<br/> `<the-returned-slice>.actions.<the-name-of-the-method>`
- so:

  1.  export the actions

      ```js
      export const counterActions = counterSlice.actions;
      ```

  2.  import the actions

      ```js
      import { counterActions } from "../store";
      ```

  3.  access and execute the specific method

      ```js
      const incrementHandler = () => {
        dispatch(counterActions.increment());
      };
      ```

- if the action includes a payload
  ```js
  const increaseHandler = () => {
    // will generate the action {type:'increase', payload:10}
    dispatch(counterActions.increase(10));
  };
  ```
