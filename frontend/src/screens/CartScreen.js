import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  chooseQuantity,
  removeFromCart,
} from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  // Query String la parameter
  const productId = props.match.params.id;
  // Truyen query String trong qua trinh dieu huong
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (productId) => {
    // delete action
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        {/* <h1>Shopping Cart</h1> */}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            <li>
              <div className="row">
                <div className="title-cart-col-1">
                  <b>Image</b>
                </div>
                <div className="title-cart-col-2">
                  <b>Name</b>
                </div>
                <div className="title-cart-col-3">
                  <b>Product Cost</b>
                </div>
                <div className="title-cart-col-4">
                  <b>Quantity</b>
                </div>
                <div className="title-cart-col-5">
                  <b>Sub Product</b>
                </div>
                <div className="title-cart-col-6">
                  <b>Delete</b>
                </div>
              </div>
            </li>

            {cartItems.map((item) => (
              <li key={item.productId}>
                <div className="row">
                  {/* image */}
                  <div className="cart-col-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  {/* name */}
                  <div className="cart-col-2">
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </div>
                  {/* product cost */}
                  <div className="cart-col-3">
                    ${item.price.toLocaleString("en-US")}
                  </div>
                  {/* quantity */}
                  <div className="cart-col-4">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.productId, Number(e.target.value))
                          // chooseQuantity(item.productId, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Sub Product Cost */}
                  <div className="cart-col-5">
                    ${(item.price * item.quantity).toLocaleString("en-US")}
                  </div>

                  {/* Delete Button */}
                  <div className="cart-col-6">
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      Delete
                      {/* <i class="fa-regular fa-trash-can"></i> */}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                : $
                {cartItems
                  .reduce((a, c) => a + c.price * c.quantity, 0)
                  .toLocaleString("en-US")}
              </h2>
              {/* <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h2> */}
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Go to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
