import { Button, Card, Col, Flex, Image, Row, Typography } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products));
  }, []);

  useEffect(() => console.log(products), [products]);

  const cardStyle = {
    width: "100%",
  };
  const imgStyle = {
    display: "block",
    width: "40%",
  };

  return (
    <>
      <div className="container rounded p-3">
        <div className="my-4">
          <Image width={80} src="/3-story.png" />
          <h1 style={{ display: "inline" }}>
            <span style={{ color: "#ea7602" }}>3</span>
            <span style={{ color: "#c60b07" }}>Story</span>{" "}
            <span style={{ color: "#0989c4" }}>Online Shop</span>
          </h1>
        </div>

        {products.map((product) => {
          return (
            <Row gutter={16} key={product.id} className="mt-3">
              <Flex justify="space-between">
                <Col span={18}>
                  <Card title="" variant="border">
                    <h3>{product.title}</h3>
                    <p>
                      Brand: {product.brand} | Category: {product.category}{" "}
                    </p>
                    <h6>Price: ${product.price}</h6>
                    <p>
                      Rating: {product.rating} | Stock: {product.stock}
                    </p>
                    <p>{product.description}</p>
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card>
                </Col>
                <Col span={6} className="text-center">
                  <Card title="" variant="border">
                    <Image width={235} src={product.images} />
                  </Card>
                </Col>
              </Flex>
            </Row>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
