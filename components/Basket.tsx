"use client";

import React, { HTMLAttributes } from "react";
import { useGetBasketQuery, useRemoveFromBasketMutation, usePostBasketMutation } from "../store/services/basket";

const Basket: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { data: basket = [] } = useGetBasketQuery();
  const [removeFromBasket] = useRemoveFromBasketMutation();
  const [updateBasket] = usePostBasketMutation();

  const handleRemoveFromBasket = (productId: string) => {
    removeFromBasket(productId);
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    const updatedBasket = basket.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    );
    updateBasket(updatedBasket);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "400px",
      }}
      {...props}
    >
      <h5 style={{ margin: "0 0 16px", fontSize: "1.5rem" }}>
        <strong>Basket</strong>
      </h5>
      {basket.length === 0 ? (
        <p style={{ color: "#777" }}>Your basket is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          {basket.map((product) => (
            <li
              key={product.productId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{product.productName}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleQuantityChange(product.productId, -1)}
                  disabled={(product.quantity || 1) <= 1}
                >
                  -
                </button>
                <span>{product.quantity || 1}</span>
                <button
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleQuantityChange(product.productId, 1)}
                >
                  +
                </button>
                <button
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveFromBasket(product.productId)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Basket;