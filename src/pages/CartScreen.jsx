import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, getUserCart } from "../actions/cartActions";
import { listProductDetails } from "../actions/productActions";

const CartScreen = ({ history }) => {
  const params = useParams();
  const location = useLocation();

  const [quantity, setQuantity] = useState(1);
  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const productDetails = useSelector((state) => state.productDetails);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>
            Your cart is empty <Link to="/">Go Back</Link>
          </p>
        ) : (
          <ListGroup variant="flush">
            <ListGroup.Item key={productDetails.product.id}>
              <Row>
                <Col md={2}>
                  <Image
                    src={productDetails.product.image}
                    alt={productDetails.product.title}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${productDetails.product.image}`}>
                    {productDetails.product.title}
                  </Link>
                </Col>
                <Col md={2}>${productDetails.product.price}</Col>
                <Col md={5}>
                  Quatity:
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                  {quantity}
                  <Button onClick={() => setQuantity(quantity - 1)}>-</Button>
                </Col>
                <Col md={2}>
                  <Button type="button" variant="light">
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + quantity, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
