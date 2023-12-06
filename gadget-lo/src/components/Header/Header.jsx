import "./Header.css";

export const Header = () => {
  return (
    <div className="header flex-row space-between padding-10px-15px">
      {/* Categories */}
      <div className="menu-bar-web flex-row space-evenly gap-15px">
        <p className="cursor link-style">Laptop</p>
        <p className="cursor link-style">Mobile</p>
        <p className="cursor link-style">Electronics</p>
      </div>

      {/* Logo */}
      <h2 className="cursor">LOGO</h2>

      {/* Menu bar */}
      <div className="menu-bar-web flex-row space-evenly gap-15px">
        <p className="cursor link-style">Search</p>
        <p className="cursor link-style">Store</p>
        <p className="cursor link-style">Cart</p>
        <p className="cursor link-style">Wishlist</p>
        <p className="cursor link-style">Login</p>
      </div>

      {/* End */}
    </div>
  );
};
