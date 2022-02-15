import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui';
import { baseURL } from '../config';

const cartInitialState = {
  cartItems: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      // in all cases add 1 to the totalQuantity
      state.totalQuantity++;
      const newItem = action.payload;
      // is it part of the cart already?
      const existingItem = state.cartItems.find((ele) => ele.id === newItem.id);

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      // const newTotalQuantity = state.cartItems.reduce(
      //   (p, c) => p + c.totalQuantity,
      //   0
      // );
      // state.totalQuantity = newTotalQuantity;
    },
    removeItemFromCart(state, action) {
      // in all cases subtract 1 to the totalQuantity
      // prevent from being negative values
      state.totalQuantity > 0
        ? state.totalQuantity--
        : (state.totalQuantity = 0);
      const id = action.payload;
      // is there just one of the item in the cart?
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((ele) => ele.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// Action Creator

export const sendCartData = (cart) => {
  return async (dispatch) => {
    // perform asynchronous code or side effect related executions
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending data',
        message: 'Please wait for a moment or two',
      })
    );

    // in its own function to be able to wrap it with try/catch
    const sendRequest = async () => {
      const response = await fetch(`${baseURL}/cart.json`, {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Data updated succesfully',
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed',
        })
      );
    }

    dispatch();
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
