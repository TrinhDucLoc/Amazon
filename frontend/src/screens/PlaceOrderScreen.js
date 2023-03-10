import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  // cart.itemsPrice = toPrice(
  //   cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  // );

  cart.productCost = toPrice(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  // cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.shippingPrice = 10;

  // cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  // cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  // cart.totalPrice = cart.productCost + cart.shippingPrice;
  cart.totalCost = cart.productCost + cart.shippingPrice;

  cart.address = cart.shippingAddress.address;

  cart.phoneNumber = cart.shippingAddress.phone;

  // cart.fullName = cart.shippingAddress.fullName;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // TODO: dispatch place order action
    // dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    dispatch(createOrder({ ...cart, orderDetails: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      // props.history.push(`/order/${order.id}`);
      props.history.push(`/orderSuccess`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Phone:</strong> {cart.shippingAddress.phone} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address}{" "}
                  <br />
                  {/* {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country} */}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  <li>
                    <div className="row">
                      <div className="order-col-1">
                        <b>Image</b>
                      </div>
                      <div className="order-col-2">
                        <b>Name</b>
                      </div>
                      <div className="order-col-3">
                        <b>Product Cost</b>
                      </div>
                      <div className="order-col-4">
                        <b>Quantity</b>
                      </div>
                      <div className="order-col-5">
                        <b>Sub Product</b>
                      </div>
                    </div>
                  </li>

                  {cart.cartItems.map((item) => (
                    <li key={item.productId}>
                      <div className="row">
                        {/* image */}
                        <div className="order-col-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>

                        {/* name */}
                        <div className="order-col-2">
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </div>
                        {/* product cost */}
                        <div className="order-col-3">
                          ${item.price.toLocaleString("en-US")}
                        </div>
                        {/* quantity */}
                        <div className="order-col-4">
                          <div>{item.quantity}</div>
                        </div>
                        {/* Sub Product Cost */}
                        <div className="order-col-5">
                          $
                          {(item.price * item.quantity).toLocaleString("en-US")}
                        </div>

                        {/* <div>
                          {item.quantity} x $
                          {item.price.toLocaleString("en-US")} = $
                          {(item.quantity * item.price).toLocaleString("en-US")}
                        </div> */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="order-col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  {/* <div>${cart.productCost.toFixed(2)}</div> */}
                  <div>${cart.productCost.toLocaleString("en-US")}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  {/* <div>${cart.shippingPrice.toFixed(2)}</div> */}
                  <div>${cart.shippingPrice.toLocaleString("en-US")}</div>
                </div>
              </li>
              {/*  */}
              {/* <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li> */}
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    {/* <strong>${cart.totalCost.toFixed(2)}</strong> */}
                    <strong>${cart.totalCost.toLocaleString("en-US")}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
