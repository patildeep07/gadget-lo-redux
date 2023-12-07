import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header flex-row space-around padding-10px-15px">
      {/* Categories */}
      <div className="menu-bar-web flex-row space-evenly gap-15px">
        <p className="cursor link-style">Laptop</p>
        <p className="cursor link-style">Mobile</p>
        <p className="cursor link-style">Television</p>
        <p className="cursor link-style">Other</p>
      </div>

      {/* Logo */}
      <h2 className="cursor" onClick={() => navigate("/")}>
        LOGO
      </h2>

      {/* Menu bar */}
      <div className="menu-bar-web flex-row space-evenly gap-15px">
        <p className="cursor link-style">Search</p>
        <p className="cursor link-style" onClick={() => navigate("/store")}>
          Store
        </p>
        <p className="cursor link-style" onClick={() => navigate("/cart")}>
          Cart
        </p>
        <p className="cursor link-style" onClick={() => navigate("/wishlist")}>
          Wishlist
        </p>
        <p className="cursor link-style" onClick={() => navigate("/login")}>
          Login
        </p>
      </div>

      {/* End */}
    </div>
  );
};
