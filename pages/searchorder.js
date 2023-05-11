import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchOrderAsync, selectOrder } from "./api/store/orderSlice";

function SearchOrder() {
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);
  const [orderId, setOrderId] = useState("");

  console.log(order);
  const handleSearch = () => {
    if (orderId.trim() !== "") {
      dispatch(searchOrderAsync(Number(orderId))).then(result => {
        console.log("Order List:", result);
      });
    }
  };
  const totalAmount = order.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <label htmlFor="orderId" className="center-label">
        Enter Order ID:
      </label>
      <input
        type="number"
        id="orderId"
        value={orderId}
        onChange={e => setOrderId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {order &&
          order.map(item => (
            <li key={item.id}>
              <p>Name: {item.name}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.qty}</p>
            </li>
          ))}
      </ul>
      <h2>Total Amount: {totalAmount.toFixed(2)}</h2>
    </div>
  );
}

export default SearchOrder;
