// src/App.jsx
import React from "react";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import { CartContext, CartProvider } from "./context/CartContext";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThankYou from "./components/ThankYou";
import Error from "./components/Error";

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
        <BrowserRouter>
          <CartToggleButton />
          <ProductList />
          <CartDrawer />
          <Routes>
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
};

export default App;
