import { Button, Col, Grid, Image, Layout, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import dayjs from "dayjs";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products));
  }, []);

  // useEffect(() => console.log(products), [products]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatDate = (date) => dayjs(date).format("ddd D MMMM ");
  const formatTime = (date) => dayjs(date).format("hh:mm:ss A");

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMedium = !screens.md;

  const contentStyle = {
    minHeight: 120,
    color: "black",
    backgroundColor: "white",
    textAlign: isMedium ? "center" : "left",
  };
  const siderStyle = {
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "white",
    textAlign: "center",
  };

  const layoutStyle = {
    borderRadius: 2,
    overflow: "hidden",
    width: "calc(100% - 8px)",
    maxWidth: "calc(100% - 8px)",
    borderBottom: "1px solid black",
    padding: "20px",
    paddingTop: "20px",
    backgroundColor: "white",
  };

  const divStyle = {
    width: "210px",
    height: "35px",
    border: "2px dashed #E74B45",
    borderRadius: "10px",
    textAlign: "center",
    padding: "3px",
    color: "#004263",
    position: "fixed",
    top: "10px",
    right: "20px",
    zIndex: 1100,
  };

  return (
    <>
      <div className="container rounded p-3">
        <div style={divStyle}>
          <p>
            {formatDate(currentTime)} {formatTime(currentTime)}
          </p>
        </div>
        <div className="my-4">
          <Image width={80} src="/3-story.png" />
          <h1 style={{ display: isMedium ? "none" : "inline" }}>
            <span style={{ color: "#ea7602" }}>3</span>
            <span style={{ color: "#c60b07" }}>Story</span>{" "}
            <span style={{ color: "#0989c4" }}>Online Shop</span>
          </h1>
        </div>

        {products.map((product) => {
          return (
            <Layout style={layoutStyle}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={18}>
                  <Content style={contentStyle}>
                    <h3>{product.title}</h3>
                    <p>
                      Brand: {product.brand} | Category: {product.category}
                    </p>
                    <h6>Price: ${product.price}</h6>
                    <p>
                      Rating: {product.rating} | Stock: {product.stock}
                    </p>
                    <p>{product.description}</p>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#1488C0" }}
                      icon={<ShoppingCartOutlined />}
                      className="mb-2"
                    >
                      Add to Cart
                    </Button>
                  </Content>
                </Col>
                <Col
                  xs={24}
                  md={6}
                  style={{
                    order: screens.md ? 0 : -1,
                  }}
                >
                  <Sider width="25%" style={siderStyle}>
                    <Image width={235} src={product.images[0]} />
                  </Sider>
                </Col>
              </Row>
            </Layout>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
