import { Button, Col, Grid, Image, Pagination, Row } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  // For Data List from DunnyJSON
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // For Pagination
  const fetchProducts = async (page) => {
    const skip = (page - 1) * pageSize;
    try {
      const res = await axios.get(
        `https://dummyjson.com/product?limit=${pageSize}&skip=${skip}`
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

  // For Date and Time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatDate = (date) => dayjs(date).format("ddd D MMMM ");
  const formatTime = (date) => dayjs(date).format("hh:mm:ss A");

  // For Responsive
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isLarge = !screens.lg;

  // layoutStyle for Date and Time
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
      <div className="container rounded">
        {/* For Date and Time */}
        <div style={divStyle}>
          <p>
            {formatDate(currentTime)} {formatTime(currentTime)}
          </p>
        </div>

        {/* For Heading */}
        <div className="my-4">
          <Image width={80} src="/3-story.png" />
          <h1 style={{ display: isLarge ? "none" : "inline" }}>
            <span style={{ color: "#ea7602" }}>3</span>
            <span style={{ color: "#c60b07" }}>Story</span>{" "}
            <span style={{ color: "#0989c4" }}>Online Shop</span>
          </h1>
        </div>

        {/* For mainBody */}
        {products.map((product) => {
          return (
            <Row
              key={product.id}
              gutter={[16, 16]}
              justify="space-between"
              align="middle"
              style={{
                borderBottom: "1px solid lightgray",
                width: "100%",
                paddingBottom: "20px",
                marginBottom: "40px",
              }}
            >
              <Col
                xs={24}
                lg={18}
                style={{ textAlign: isLarge ? "center" : "left" }}
              >
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
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </Col>
              <Col
                xs={24}
                lg={6}
                style={{
                  order: screens.lg ? 0 : -1,
                  textAlign: isLarge ? "center" : "right",
                }}
              >
                <Image width={235} src={product.images[0]} />
              </Col>
            </Row>
          );
        })}

        {/* For Pagination */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            showSizeChanger={false}
            align="center"
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
