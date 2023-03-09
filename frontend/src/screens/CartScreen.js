import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
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
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            <li>
              <div className="row">
                <div>Image</div>
                <div className="min-30">Name</div>
                <div>Product Cost</div>
                <div>Quantity</div>
                <div>Sub Product</div>
                <div>Delete</div>
              </div>
            </li>

            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  {/* image */}
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  {/* name */}
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  {/* product cost */}
                  <div>${item.price}</div>
                  {/* quantity */}
                  <div>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.productId, Number(e.target.value))
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
                  <div>${item.price * item.quantity}</div>

                  {/* Delete Button */}
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      Delete
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
                : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
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
