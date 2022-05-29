// Vanilla

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
