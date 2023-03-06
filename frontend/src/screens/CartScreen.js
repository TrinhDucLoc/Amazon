import React from "react";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

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
