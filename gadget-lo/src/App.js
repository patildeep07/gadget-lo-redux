import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/Cart/Cart";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Store } from "./pages/Store/Store";

function App() {
  return (
    <div className="App">
      <Header className="header" />
      <hr />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </div>
  );
}

export default App;
