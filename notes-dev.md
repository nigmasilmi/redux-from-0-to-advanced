## Redux from cero to advanced

Specific implementation for React

### The basics: installation

- npm i redux react-redux

### The basics: base implementation

    1. create store, reducer and subscription

    2. provide the store to the highest level needed. use Provider and import the store itself, pass the store as prop "store" in the Provider component
    3. get access to the redux data inside a component by using the useSelector custom hook from react-redux, which takes a slice of the state and returns it. Also the useSelector hook creates a subscription, and then every time the state changes, the component will get the latest state.
    4. dispatch actions using useDispatch, the execution of this hook returns a dispatch function which receives the action to be dispatched

### In case of a class Component: connect it

    1. Transform the component from function to class
    2. import connect, from react-redux
    3. The component must be the argument passed to the returned function that connect() excecution returns

```
export default connect()(TheComponent)
```

    4. Connect also receives 2 arguments, both functions
    5. The First one will map the state to props, takes the state, and returns an object where the keys are will be available as props in the receiver components and the values will be the logic of drilling in the state
    6. The Second one will help to store dispatch functions in props, that when executed will dispatch an action. This function takes the dispatch function automatically and return an object where the keys are prop names and their value is another function in which we call dispatch with the action
    7. The connect function also creates a subscription to the store

### Adding new pieces of state: the long way

1. We can add another piece of state by adding it to the initial state and then to all the returned objects in the reducer
2. Remember that the reducer substitutes the state, it does not merge it, so, in the returned state object, we must take into account the other pieces of state
