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

z

##### Using Firebase as backend

1. Add project
2. Use Realtime Database > create DB > start in test mode
3. Add significant-name.json to the end of the endpoint in the requests from the component

##### Where to put our code

Option 1. Execute in the component --- code duplication, lack of control and maintenance 😵‍💫 <br />
Option 2. Inside action creators
Consider this:

1. Connect Redux with asynchronous code and side effects
2. Because reducers must be pure, synchronous and side-effect free

How is the Option 1?

- from the component, not only dispatch the action, but also make a request to the backend to send the data.

  - Whats wrong with this?

    - the logic to guide the state update is in the reducer, not in the component nor the backend
    - if we put the logic in the component and not in the reducer, be aware that not-mutable state must be managed with attention.
    - After the logic is applied, an action is dispatched with the newly created pieces of state
    - The real problem is, that if this logic is needed in other components, there could be code duplication, but if we extract that logic into a helper funcion, that data transformation wouldbe (in both cases) outside of the reducer, and therefore we wouldn't be using Redux in all its capacity, that would be a sub-optimal implementation of Redux

  - Fat action creators 🥐 vs Fat components 🥓 vs Fat reducers 🍩
    - If we handle just synchronous data transformations (without side effects) ==>> Prefer a Fat 🍩 Reducer
    - If we have an async code or code with side-effects to handle the logic ===>> Prefer a Fat 🥐 action creator or a Fat component 🥓

### useEffect & Redux 🐜💨

- a better solution to manage asynchronous code
- dispatch action from the component -> implement the logic in the reducer -> to synch the data in the backend send the request from the component or a different one

### Thunks 📣‼️

- is a function that delays an action until later
- we can create an action creator as a thunk
- So, a thunk is an action creator function than does not return the action itself but another function which eventually returns the action

- As currently implemented - see commit b510154 - the functions are executed correctly, however ther is a warning in the console `Uncaught (in promise) Error: Actions must be plain objects. Instead, the actual type was: 'undefined'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.` => Solution coming soon

SOLUTION: the action creators where calling an additional dispatch() from inside without any action or whatsoever, that was a mistake, the code was commented and not removed in order to remember the learning in that mistake.

##### Redux Devtools

1. Install browser extension
2. To configure the project using redux-toolkit:

```
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
  devTools: true,
});
```
