import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  USER_CART_DETAILS_REQUEST,
  USER_CART_DETAILS_FAIL,
  USER_CART_DETAILS_SUCCESS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const getUserCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_CART_DETAILS_REQUEST });
    const { data } = await axios.get(
      `https://fakestoreapi.com/carts/user/${id}`
    );

    dispatch({ type: USER_CART_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CART_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
