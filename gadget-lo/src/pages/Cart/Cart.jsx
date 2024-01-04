import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { placeOrder, removeFromCart } from "../../features/Users/UserSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const user = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id: userId, cart, address } = user;

  const [selectedAddress, setSelectedAddress] = useState({});

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );
  const totalSavings = cart.reduce(
    (acc, curr) =>
      acc + (curr.product.price - curr.product.discountPrice) * curr.quantity,
    0
  );

  const finalPrice = totalPrice - totalSavings;

  // UI
  return (
    <div>
      <div className="cart-container">
        {/* Cart content */}
        <div className="cart-content">
          {cart.length === 0 && (
            <p>
              Looks like your cart is feeling a bit empty! 🛒 Why not treat
              yourself to some fantastic finds? Explore our collection and add a
              touch of joy to your shopping cart. Happy browsing and happy
              shopping! 🛍️✨
            </p>
          )}

          {cart.length > 0 && (
            <div className="content-listing gap-20px">
              <div>
                {cart.map((item) => {
                  const { _id, product } = item;
                  const {
                    _id: productId,
                    productName,
                    productImage,
                    brandName,
                    discountPrice,
                    price,
                  } = product;
                  return (
                    <div key={_id}>
                      <div className="cart-product-container ">
                        <div className="cart-image-container">
                          <img
                            alt={productName}
                            src={productImage}
                            className="cart-image"
                          />
                          <div className="flex-row justify-content-center">
                            <p>-</p>
                            <p>0</p>
                            <p>+</p>
                          </div>
                        </div>

                        <div className="content-listing">
                          <p className="font-weight-500">
                            {brandName} {productName}
                          </p>

                          <p className="font-weight-400">Seller: {brandName}</p>

                          {discountPrice ? (
                            <div className="flex-row gap-10px">
                              <p className="bold">Rs. {discountPrice}</p>
                              <p className="strikethrough">Rs. {price}</p>
                              <p className="font-green">
                                ({" "}
                                {100 - parseInt((discountPrice / price) * 100)}{" "}
                                % off )
                              </p>
                            </div>
                          ) : (
                            <p>Rs. {price}</p>
                          )}

                          <p
                            className="cursor dotted-underline"
                            onClick={() => {
                              dispatch(removeFromCart({ userId, productId }));
                            }}
                          >
                            Remove from cart
                          </p>

                          {/* End */}
                        </div>
                      </div>

                      <div className="dotted-line"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Cart summary */}
        <div className="cart-summary">
          <p className="font-weight-500">PRICE DETAILS</p>

          <div className="dotted-line"></div>

          <div className="flex-row space-between">
            <p>Price ({cart.length} item/s)</p>
            <p>Rs. {totalPrice}</p>
          </div>

          <div className="flex-row space-between">
            <p>Discount</p>
            <p className="font-green">- Rs. {totalSavings}</p>
          </div>

          <div className="dotted-line"></div>

          <div className="flex-row space-between font-weight-500">
            <p>Total Amount</p>
            <p>Rs. {finalPrice}</p>
          </div>

          <div className="dotted-line"></div>

          <p className="font-green">
            You'll save Rs. {totalSavings} on this order
          </p>

          <div className="dotted-line"></div>

          <p className="font-weight-500">
            Select an address to deliver your order:*
          </p>

          {address.length === 0 && (
            <p>Please go to your profile, and add a new address</p>
          )}

          {address.length > 0 && (
            <div>
              {address.map((item, idx) => {
                const { addressType, addressInfo } = item;
                return (
                  <div
                    key={idx}
                    className="flex-row gap-10px cart-address-container"
                  >
                    <input
                      id={addressType}
                      name="address-radio"
                      type="radio"
                      value={item}
                      onChange={(e) => {
                        setSelectedAddress(e.target.value);
                      }}
                    />
                    <div className="address-label">
                      <label htmlFor={addressType} className="font-weight-500">
                        {addressType}
                      </label>
                      <label htmlFor={addressType}>{addressInfo}</label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="dotted-line"></div>

          {/* Button */}
          <button
            className={`add-to-cart-button fb641b width-100 ${
              Object.keys(selectedAddress).length === 0 ? "disabled" : "enable"
            } ${cart.length === 0 ? "disabled" : "enable"}`}
            disabled={
              Object.keys(selectedAddress).length === 0
                ? true
                : false || cart.length === 0
            }
            onClick={() => {
              dispatch(placeOrder({ userId }));
              navigate("/");
            }}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};
