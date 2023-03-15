import Axios from "axios";

import {
  CART_ADD_ITEM,
  CART_CHOOSE_QUANTITY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/product/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        productId: data.id,
        quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const chooseQuantity =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/product1/${productId}`);
    dispatch({
      type: CART_CHOOSE_QUANTITY,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        productId: data.id,
        quantity,
      },
    });

    // dispatch({ type: CART_CHOOSE_QUANTITY, payload: { productId, quantity } });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// export const chooseQuantity =
//   (productId, quantity) => async (dispatch, getState) => {
//     const { data } = await Axios.get(`/api/product/${productId}`);
//     dispatch({
//       type: CART_CHOOSE_QUANTITY,
//       payload: {
//         name: data.name,
//         image: data.image,
//         price: data.price,
//         countInStock: data.countInStock,
//         productId: data.id,
//         quantity,
//       },
//     });
//     localStorage.setItem(
//       "cartItems",
//       JSON.stringify(getState().cart.cartItems)
//     );
//   };

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// export const saveAddress = (data) => (dispatch) => {
//   dispatch({ type: CART_SAVE_ADDRESS, payload: data });
// };

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
