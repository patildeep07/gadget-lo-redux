import "./Header.css";

export const Header = () => {
  return (
    <div className="header flex-row space-between padding-10px-15px">
      {/* Logo */}
      <h2 className="cursor">Gadget Lo</h2>

      {/* Menu bar */}
      <div className="menu-bar-web flex-row space-evenly gap-10px">
        <h3 className="cursor">Store</h3>
        <h3 className="cursor">Cart</h3>
        <h3 className="cursor">Wishlist</h3>
        <h3 className="cursor">Login</h3>
      </div>

      {/* End */}
    </div>
  );
};
