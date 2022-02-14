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
    3. Remember also NEVER MUTATE THE STATE, always overwrite the state object with a new one

### Redux Toolkit

[Hello Redux Toolkit](https://redux-toolkit.js.org/)

#### Configuration

`npm install @reduxjs/toolkit `

### Adding Slices 🍕

1. In the store, `import {createSlice} from '@reduxjs/toolkit'`
2. Call the function with its arguments
   1. the name of the slice
   2. the initialState
   3. the reducers that this slice needs
      3.1 add the methods with a significant name
      3.2 Every method receives the latest state
      3.3 The methods will execute depending of the action that is coming to the reducer, therefore the if checks can be ommited
      3.4 In the body of the reducers methods, we can perform actions that mutates the state, why? because internally this mutation is noted by the package and then clones the state, checks also which parts are been modified and does all the heavy lifting for us. 🤔

#### How to make the Reducer aware of the slices?

1. Use the returned value from createSlice()

```
const counterSlice = createSlice({......})
```

2. Access the reducer method of it and replace the reducer that is needed for the store creation:

```
const store = createStore(counterSlice.reducer);
```

3. But if we have a lot of slices...?
   3.1 Use the combineReducers from redux or
   3.2 Use configureStore from @reduxjs/toolkit. This function creates a store and combines reducers
   ```
   const store = configureStore({
       counter: counterSlice.reducer,
       toggler: togglerSlice.reducer,
       whatever: whateverSlice.reducer
   });
   ```

#### How to dispatch actions using slices?

1. Migrate everything to redux toolkit
2. createSlices automatically creates unique actions identifiers for our reducers, to access them we use
   `counterSlice.actions.`
   the autocomplete will show that there are methods with the same names as the names of the methods created inside the reducers property of the createSlice function config object

Those methods are <strong>action creators</strong> that have the type preconfigured, and then we can export those methods and access them in the component that needs to dispatch those actions

```
export const counterActions = counterSlice.actions
```

### Redux and side effects 🛸

1. The reducer functions must be pure, side-effect free and synchronous
2. The side effects tasks can be executed in inside the components or inside <strong>action creators</strong>

#### Handling Async Tasks

#### Where to put our code

### Redux Devtools

Design notes

1. store with items, cart
2. item = {name:'skjsl', qty:number}
3. cart reducer with add, remove
4. Cart button to show and hide it
