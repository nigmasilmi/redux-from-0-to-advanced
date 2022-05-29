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
