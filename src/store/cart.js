import { createSlice } from '@reduxjs/toolkit';

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
export const cartActions = cartSlice.actions;

export default cartSlice;
