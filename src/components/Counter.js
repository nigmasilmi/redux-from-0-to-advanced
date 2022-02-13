import React from 'react';
import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';

class Counter extends React.Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }
  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

// const Counter = () => {
//   const count = useSelector((state) => state.count);
//   const dispatch = useDispatch();

//   const toggleCounterHandler = () => {};

//   const decrementHandler = () => {
//     dispatch({ type: 'decrement' });
//   };

//   const incrementHandler = () => {
//     dispatch({ type: 'increment' });
//   };

//   return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{count}</div>
//       <div>
//         <button onClick={incrementHandler}>Increment</button>
//         <button onClick={decrementHandler}>Decrement</button>
//       </div>
//       <button onClick={toggleCounterHandler}>Toggle Counter</button>
//     </main>
//   );
// };

// export default Counter;
