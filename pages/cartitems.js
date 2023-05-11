import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItemsAsync,
  selectCartItems,
  removeCartItemAsync,
  updateQtyAsync,
} from "./api/store/cartitemSlice";
import { createOrderAsync } from "./api/store/orderSlice";

function CartItems() {
  const [newQty, setNewQty] = useState("");
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      const total = (item.qty ?? 0) * (item.price ?? 0);
      return acc + total;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleRemoveItem = async itemId => {
    await dispatch(removeCartItemAsync(itemId));
    await dispatch(fetchCartItemsAsync());
  };

  const handleCreateOrder = async () => {
    createOrderAsync({ orderList: JSON.stringify(cartItems) });
    alert(cartItems.id);
  };

  const handleRemoveAllItems = async () => {
    for (const cartItem of cartItems) {
      await handleRemoveItem(cartItem.id);
    }
    await dispatch(fetchCartItemsAsync());
  };

  const handleUpdateQty = async (itemId, qty) => {
    await dispatch(updateQtyAsync({ id: itemId, qty: qty }));
    await dispatch(fetchCartItemsAsync());
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
              value={newQty}
              onChange={e => setNewQty(e.target.value)}
            />
            <button onClick={() => handleUpdateQty(item.id, newQty)}>
              Update Qty
            </button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* <p>Total: {total.toFixed(2)}</p> */}
      <button onClick={handleCreateOrder}>Create Order</button>
      <button onClick={handleRemoveAllItems}>Remove All Cart Items</button>
    </div>
  );
}

export default CartItems;
