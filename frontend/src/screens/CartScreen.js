import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function CartScreen(props) {
  // Query String la parameter
  const productId = props.match.params.id;
  // Truyen query String trong qua trinh dieu huong
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  return (
    <div>
      <div className="row center">
        <div>
          <h1>Hi</h1>
          <p>
            Cart have product with productId: {productId} with quantity:{" "}
            {quantity}
          </p>
        </div>
      </div>
    </div>
  );
}
