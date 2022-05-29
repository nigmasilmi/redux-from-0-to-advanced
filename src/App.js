import { Fragment } from "react";
import { Counter } from "./components/Counter";
import CounterClass from "./components/Counter";

function App() {
  return (
    <Fragment>
      {" "}
      <Counter />
      <h3>With class-based</h3>
      <CounterClass />
    </Fragment>
  );
}

export default App;
