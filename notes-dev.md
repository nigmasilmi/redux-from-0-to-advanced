## Redux from cero to advanced

Specific implementation for React

### The basics: installation

- npm i redux react-redux

### The basics: base implementation

    1. create store, reducer and subscription

    2. provide the store to the highest level needed. use Provider and import the store itself, pass the store as prop "store" in the Provider component
    3. get access to the redux data inside a component by using the useSelector custom hook from react-redux, which takes a slice of the state and returns it. Also the useSelector hook creates a subscription, and then every time the state changes, the component will get the latest state.
    4. dispatch actions using useDispatch, the execution of this hook returns a dispatch function which receives the action to be dispatched
