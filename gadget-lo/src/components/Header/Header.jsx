import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";

export const Header = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const { isLoggedIn } = users;

  // UI
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
        Gadget Lo
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

        {!isLoggedIn && (
          <p className="cursor link-style" onClick={() => navigate("/login")}>
            Login
          </p>
        )}

        {isLoggedIn && (
          <p className="cursor link-style" onClick={() => navigate("/account")}>
            Account
          </p>
        )}
      </div>

      {/* End */}
    </div>
  );
};
