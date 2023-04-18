import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";

export default function popUpWindow({ product }) {
  const [qty, setQty] = useState(0);

  const handleAddToCart = async () => {
    try {
      const { data, error } = await supabase.from("piggerdb").insert([
        {
          name: product.name,
          price: product.price,
          qty: qty,
        },
      ]);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = event => {
    setQty(event.target.value);
  };
  
  if (!product) {
    // Render fallback UI or return null
    return null;
  }
  return (
    <div>
      <img src={product.image} />
      <p>{product.name}</p>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <input type="number" value={qty} onChange={handleInputChange} />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
