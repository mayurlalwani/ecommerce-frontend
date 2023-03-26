import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import CartScreen from "./screens/CartScreen";
// import HomeScreen from "./screens/HomeScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";
// import ProductScreen from "./screens/ProductScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import ShippingScreen from "./screens/ShippingScreen";

const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <main className="py-3">
          {/* <Container>
            <Route path="/order/:id" component={ShippingScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route exact path="/" component={HomeScreen} />
          </Container> */}
        </main>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
