import React, { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";

export default function CartItems() {
  const [fetchError, setFetchError] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data, error } = await supabase.from("piggerdb").select();
        if (error) {
          throw error;
        }
        setCartItems(data);
        console.log(data);
      } catch (error) {
        setFetchError(error.message);
      }
    };
    fetchCartItems();
  }, []);

  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.qty;
    });
    return total;
  };

  const handleRemoveItem = async itemId => {
    try {
      const { data, error } = await supabase
        .from("piggerdb")
        .delete()
        .eq("id", itemId);
      if (error) {
        throw error;
      }
      setCartItems(cartItems.filter(item => item.id !== itemId));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQty = async (itemId, newQty) => {
    try {
      const { data, error } = await supabase
        .from("piggerdb")
        .update({ qty: newQty })
        .eq("id", itemId);
      if (error) {
        throw error;
      }
      const updatedItems = cartItems.map(item => {
        if (item.id === itemId) {
          return { ...item, qty: newQty };
        }
        return item;
      });
      setCartItems(updatedItems);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>sdasd</p>
      {fetchError ? (
        <p>Error fetching data: {fetchError}</p>
      ) : cartItems ? (
        <div>
          <ul>
            {cartItems.map(cartItem => (
              <li key={cartItem.id}>
                <p>Name: {cartItem.name}</p>
                <p>Price: ${cartItem.price}</p>
                <p>
                  Quantity:
                  <input
                    type="number"
                    value={cartItem.qty}
                    onChange={e => handleUpdateQty(cartItem.id, e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleUpdateQty(cartItem.id, cartItem.qty - 1)
                    }
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateQty(cartItem.id, cartItem.qty + 1)
                    }
                  >
                    +
                  </button>
                </p>
                <p>Amount: ${cartItem.price * cartItem.qty}</p>
                <button onClick={() => handleRemoveItem(cartItem.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total Amount: ${getTotalAmount()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
