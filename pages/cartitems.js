import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItemsAsync,
  selectCartItems,
  removeCartItemAsync,
  updateQtyAsync,
} from "./api/store/cartitemSlice";

function CartItems() {
  const [newQty, setNewQty] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  const handleRemoveItem = async itemId => {
    await dispatch(removeCartItemAsync(itemId));
    await dispatch(fetchCartItemsAsync());
  };

  const handleQtyChange = (itemId, newQty) => {
    dispatch(updateQtyAsync({ itemId, newQty }));
    dispatch(fetchCartItemsAsync());
  };

  const handleInputChange = e => {
    setNewQty(e.target.value);
  };

  const handleUpdateQty = (itemId, qty) => {
    handleQtyChange(itemId, qty);
    setNewQty("");
  };

  return (
    <div>
      <h1>Cart Items</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item?.id ?? "unknown"}>
            {" "}
            {item && item.name ? item.name : "N/A"}
            {item && item.price ? item.price : "N/A"}
            {"             "}
            {"Qty:  "}
            {item && item.qty ? item.qty : "N/A"}
            {"             "}
            <input
              type="number"
              onChange={handleInputChange}
              style={{ width: "35px" }}
            />
            <br />
            <button onClick={() => handleUpdateQty(item.id, newQty)}>
              Update Qty
            </button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartItems;
