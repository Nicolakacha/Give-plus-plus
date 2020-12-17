import { createSlice } from '@reduxjs/toolkit';
import {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  deleteItemsBySeller,
} from "../../../webAPI/cartAPI";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // state
    cart: [],
    errorMessage: null,
    isLoading: false,
    mask: false,
  },
  reducers: {
    // reducer
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMask: (state, action) => {
      state.mask = action.payload;
    },
  },
});

export const {
  //action
  setErrorMessage,
  setCart,
  setIsLoading,
  setMask,
} = cartSlice.actions;

export const getCartItem = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return getItem().then((res) => {
    if (!res || res.ok === 0)
      return dispatch(setErrorMessage(res ? res.message : "no data"));
    dispatch(setCart(res.data));
    dispatch(setIsLoading(false));
    return res.data
  });
};

export const addCartItem = (productId, quantity) => (dispatch) => {
  dispatch(setIsLoading(true));
  return addItem(productId, quantity).then((res) => {
    dispatch(setIsLoading(false));
    return res;
  });
};
export const minusQuantity = (quantity, id) => (dispatch) => {
  dispatch(setIsLoading(true));
  console.log(quantity);
  quantity--;
  return updateItem(quantity, id).then((res) => {
    console.log(quantity);
    dispatch(setIsLoading(false));
    return res;
  });
};
export const addQuantity = (quantity, id) => (dispatch) => {
  dispatch(setIsLoading(true)); 
  console.log(quantity);
  quantity++;
  return updateItem(quantity, id).then((res) => {
    console.log(quantity);
    dispatch(setIsLoading(false));
    return res;
  });
};
export const deleteCartItem = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return deleteItem(id).then((res) => {
    dispatch(setIsLoading(false));
    return res;
  });
};
export const deleteCartItemsBySeller = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return deleteItemsBySeller(id).then((res) => {
    dispatch(setIsLoading(false));
    return res;
  });
};


export const selectMask = (state) => state.order.mask;
export const selectError = (state) => state.cart.errorMessage;
export const selectLoading = (state) => state.cart.isLoading;
export const selectCart = (state) => state.cart.cart;
export default cartSlice.reducer;
