import { uiActions } from './ui';
import { cartActions } from './cart';
import { baseURL } from '../config';

// fetch data
export const fetchCartData = () => {
  return async (dispatch) => {
    // dispatch action to let the user know we are working
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Fetching data',
        message: 'Please wait for a moment',
      })
    );
    // make the request
    const sendRequest = async () => {
      const response = await fetch(`${baseURL}/cart.json`);
      if (!response.ok) {
        throw new Error('Fetching cart data failed');
      }
      const data = response.json();
      return data;
    };
    // handle the errors and dispatch notification error
    try {
      const cartData = await sendRequest();
      dispatch(
        cartActions.replaceCart({
          cartItems: cartData.cartItems || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
      // dispatch success notification
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Data fetched succesfully',
        })
      );
    } catch (error) {
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

// send data
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
        body: JSON.stringify({
          cartItems: cart.cartItems,
          totalQuantity: cart.totalQuantity,
        }),
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
