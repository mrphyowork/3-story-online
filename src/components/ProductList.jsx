import { Button, Image, Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products));
  }, []);

  useEffect(() => console.log(products), [products]);

  const contentStyle = {
    textAlign: "left",
    minHeight: 120,
    // lineHeight: "120px",
    color: "black",
    backgroundColor: "white",
  };
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "white",
  };

  const layoutStyle = {
    borderRadius: 2,
    overflow: "hidden",
    width: "calc(100% - 8px)",
    maxWidth: "calc(100% - 8px)",
    borderBottom: "1px solid black",
    padding: "5px",
    paddingTop: "30px",
    backgroundColor: "white",
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
            <Layout style={layoutStyle}>
              <Layout>
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
                    icon={<ShoppingCartOutlined />}
                    className="mb-2"
                  >
                    Add to Cart
                  </Button>
                </Content>
                <Sider width="25%" style={siderStyle}>
                  <Image width={235} src={product.images} />
                </Sider>
              </Layout>
            </Layout>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
