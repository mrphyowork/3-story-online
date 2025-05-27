import { Button, Image, Layout, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchProducts = async (page) => {
    const skip = (page - 1) * pageSize;
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`
      );
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const contentStyle = {
    textAlign: "left",
    minHeight: 120,
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
    <div className="container rounded p-3">
      <div className="my-4">
        <Image width={80} src="/3-story.png" />
        <h1 style={{ display: "inline" }}>
          <span style={{ color: "#ea7602" }}>3</span>
          <span style={{ color: "#c60b07" }}>Story</span>{" "}
          <span style={{ color: "#0989c4" }}>Online Shop</span>
        </h1>
      </div>

      {products.map((product) => (
        <Layout key={product.id} style={layoutStyle}>
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
              <Image width={235} src={product.images[0]} />
            </Sider>
          </Layout>
        </Layout>
      ))}

      {/* Pagination Section */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ProductList;
