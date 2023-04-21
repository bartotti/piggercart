import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCartItemAsync,
  fetchCartItemsAsync,
} from "./api/store/cartitemSlice";

export default function popUpWindow({ product }) {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const cartItem = {
      name: product.name,
      price: product.price,
      qty: qty,
    };
    await dispatch(addCartItemAsync(cartItem));
    await dispatch(fetchCartItemsAsync());
  };

  const handleInputChange = event => {
    setQty(event.target.value);
  };

  if (!product) {
    return;
  }
  return (
    <div>
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <input type="number" value={qty} onChange={handleInputChange} />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
