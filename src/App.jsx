// src/App.jsx
import React from "react";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import { CartContext, CartProvider } from "./context/CartContext";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext } from "react";

const CartToggleButton = () => {
  const { toggleCart } = useContext(CartContext);
  return (
    <Button
      type="primary"
      icon={<ShoppingCartOutlined />}
      onClick={toggleCart}
      style={{
        position: "fixed",
        top: "50px",
        right: "20px",
        zIndex: 1000,
        borderRadius: "50px",
      }}
    >
      View Cart
    </Button>
  );
};
const App = () => {
  return (
    <CartProvider>
      <div>
        <CartToggleButton />
        <ProductList />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default App;
