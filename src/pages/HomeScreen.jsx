import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Product from "../components/Product";
import axios from "axios";
import FormContainer from "../components/FormContainer";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [productsList, setProductsList] = useState([]);
  console.log({ productsList });
  const handleSearch = (e) => {
    const filterSearchProducts = products.filter((item) =>
      item.title.toLowerCase().includes(e.target.value)
    );
    setProductsList(filterSearchProducts);
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    setProductsList(products);
  }, [products]);

  return (
    <>
      <FormContainer>
        <Form
        //  onSubmit={submitHandler}
        >
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search..."
              // value={username}
              onChange={handleSearch}
            ></Form.Control>
          </Form.Group>
        </Form>
      </FormContainer>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {productsList.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
