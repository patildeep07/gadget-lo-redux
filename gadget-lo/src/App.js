import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/Cart/Cart";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Store } from "./pages/Store/Store";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { useSelector } from "react-redux";
import { Account } from "./pages/Account/Account";

function App() {
  const users = useSelector((state) => state.users);
  const { isLoggedIn } = users;

  // UI
  return (
    <div className="App">
      <Header className="header" />
      <hr />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* If not logged in */}
        {!isLoggedIn && <Route path="/cart" element={<Login />} />}
        {!isLoggedIn && <Route path="/wishlist" element={<Login />} />}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/account" element={<Login />} />}

        {/* If logged In */}
        {isLoggedIn && <Route path="/cart" element={<Cart />} />}
        {isLoggedIn && <Route path="/wishlist" element={<Wishlist />} />}
        {isLoggedIn && <Route path="/login" element={<Account />} />}
        {isLoggedIn && <Route path="/account" element={<Account />} />}

        {/* General */}
        <Route path="/store" element={<Store />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
