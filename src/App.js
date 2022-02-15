import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui';
import { baseURL } from './config';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  // get hold of the state
  // useSelector creates a subscription to Redux, so, when the state changes
  // this component is re-evaluated and the cart contains the latest state
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // when the state changes, update it in the backend
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending data',
          message: 'Please wait for a moment or two',
        })
      );
      const response = await fetch(`${baseURL}/cart.json`, {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Data updated succesfully',
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
