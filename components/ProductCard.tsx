import React, { HTMLAttributes } from "react";
import { Product } from "../types";
import { useGetBasketQuery, useAddToBasketMutation, useRemoveFromBasketMutation } from "../store/services/basket";

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, ...props }) => {
  const { data: basket = [] } = useGetBasketQuery();
  const [addToBasket] = useAddToBasketMutation();
  const [removeFromBasket] = useRemoveFromBasketMutation();

  const isInBasket = basket.some((item) => item.productId === product.productId);

  const handleBasketToggle = () => {
    if (isInBasket) {
      removeFromBasket(product.productId);
    } else {
      addToBasket(product);
    }
  };

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
      }}
      {...props}
    >
      <img
        src={product.productImage}
        alt={product.productName}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px", flex: "1", display: "flex", flexDirection: "column" }}>
        <h5 style={{ margin: "0 0 8px", fontSize: "1.25rem" }}>{product.productName}</h5>
        <p style={{ margin: "0 0 16px", color: "#555" }}>Stock: {product.stock}</p>
        <button
          style={{
            marginTop: "auto",
            padding: "8px 16px",
            backgroundColor: isInBasket ? "#dc3545" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleBasketToggle}
        >
          {isInBasket ? "Remove from Basket" : "Add to Basket"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;