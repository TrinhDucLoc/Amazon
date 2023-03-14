import {
  CART_ADD_ITEM,
  CART_CHOOSE_QUANTITY,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      //   If exist item => save update value of item. Else add item in the end cartItems
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    //========================================================
    // case CART_ADD_ITEM:
    //   const existItem2 = state.cartItems.find(
    //     (item) => item.productId === action.payload.productId
    //   );
    //   // if exist-item true just add quantity of the item and if not then push product to the state of the cart.cartItems
    //   if (existItem2) {
    //     existItem2.quantity += action.payload.quantity;
    //   } else {
    //     state.cartItems.push(action.payload);
    //   }

    // =====================================================
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return { ...state, cartItems: [] };

    case CART_CHOOSE_QUANTITY:
      const item1 = action.payload;
      const existItem1 = state.cartItems.find(
        (x) => x.productId === item1.productId
      );
      //   If exist item => save update value of item. Else add item in the end cartItems
      if (existItem1) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem1.productId ? item1 : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item1] };
      }

    default:
      return state;
  }
};
