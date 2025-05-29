import React, { useContext } from "react";
import { Drawer, List, Button, Typography, Divider, InputNumber } from "antd";
import { CartContext } from "../context/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CartDrawer = () => {
  const {
    cartItems,
    isCartVisible,
    toggleCart,
    removeFromCart,
    updateQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer
      title={
        <Title
          style={{
            color: "#333",
            fontWeight: "bold",
            fontSize: "1.3rem",
            marginTop: "60px",
          }}
        >
          <ShoppingCartOutlined style={{ marginRight: "5px" }} />
          Your Cart
        </Title>
      }
      placement="right"
      closable
      onClose={toggleCart}
      open={isCartVisible}
      width={400}
      bodyStyle={{ padding: "15px", backgroundColor: "#f8f9fa" }}
    >
      <List
        dataSource={cartItems}
        locale={{ emptyText: "Your cart is empty." }}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "15px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              marginBottom: "20px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <List.Item.Meta
              title={<Text style={{ fontSize: "16px" }}>{item.title}</Text>}
              description={<Text style={{ color: "#666" }}>${item.price}</Text>}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => updateQuantity(item.id, value)}
                size="small"
                style={{ width: "50px" }}
              />
              <Text strong style={{ fontSize: "16px", color: "#333" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>

              <Button
                type="link"
                danger
                style={{ fontSize: "14px", padding: "4px 8px" }}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={{ textAlign: "right", padding: "15px " }}>
        <Title level={5} style={{ color: "#333", fontWeight: "bold" }}>
          Total: ${totalPrice.toFixed(2)}
        </Title>
        <Button
          type="primary"
          style={{
            border: "none",
            fontSize: "16px",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: "#1488C0",
          }}
          onClick={() => alert("Thank You! See You Again!")}
        >
          Checkout
        </Button>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
