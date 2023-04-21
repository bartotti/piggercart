import React, { useState } from "react";
import Cartitems from "./cartitems";
import PopUpWindow from "./popUpWindow";

const products = [
  { name: "plate 1", price: 1.99, image: "plate1.jpeg", description: "zxc123" },
  {
    name: "plate 2",
    price: 2.99,
    image: "plate2.jpeg",
    description: "acc1723",
  },
  { name: "plate 3", price: 3.99, image: "plate3.jpeg", description: "zbzc53" },
];

export default function mainScreen() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);

  const handleImageClick = index => {
    setSelectedProductIndex(index);
  };

  return (
    <div className="product-main">
      {products.map((product, index) => (
        <div
          key={index}
          className="product-section"
          style={{ display: "inline-block", width: "50%" }}
        >
          <img
            className="product-img"
            src={`/${product.image}`}
            alt="product image list"
            onClick={() => handleImageClick(index)}
            style={{ cursor: "pointer", maxWidth: "100%" }}
          />
        </div>
      ))}
      {selectedProductIndex !== -1 && (
        <PopUpWindow product={products[selectedProductIndex]} />
      )}
      <div>
        <Cartitems />
      </div>
    </div>
  );
}
