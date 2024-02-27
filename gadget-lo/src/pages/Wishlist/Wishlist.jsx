import { useDispatch, useSelector } from "react-redux";
import "./Wishlist.css";
import { addToCart, removeFromWishlist } from "../../features/Users/UserSlice";

export const Wishlist = () => {
  document.title = "Wishlist";

  const user = useSelector((state) => state.users.currentUser);

  const { _id: userId, wishlist, cart } = user;

  const dispatch = useDispatch();

  const isInCart = (productId) => {
    const result = cart.some(({ product }) => product._id === productId);
    return result;
  };

  // UI
  return (
    <div>
      <div className="cart-container">
        {/* Wishlist text content */}
        <div className="cart-summary">
          <p className="font-weight-500">Your Wishlist</p>
          <div className="dotted-line"></div>
          <p>
            Welcome to our Wishlist section – your virtual space to curate and
            organize your most coveted items! Easily bookmark products you love,
            streamline your shopping experience, and stay updated on the
            availability of your favorite picks.Start building your wishlist
            today and turn your desires into a personalized shopping journey.
            Happy exploring!
          </p>
        </div>

        {/* Wishlist items */}
        <div className="cart-content">
          {wishlist.length === 0 && (
            <p>
              Your wishlist is currently empty. Start adding your favorite items
              to create a personalized shopping experience! 🛍️✨
            </p>
          )}

          {wishlist.length > 0 && (
            <div className="content-listing gap-20px">
              <div>
                {wishlist.map((item) => {
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

                          {!isInCart(productId) && (
                            <p
                              className="cursor dotted-underline"
                              onClick={() => {
                                dispatch(addToCart({ userId, productId }));
                                dispatch(
                                  removeFromWishlist({ userId, productId })
                                );
                              }}
                            >
                              Move to cart
                            </p>
                          )}

                          {isInCart(productId) && (
                            <p className="cursor dotted-underline font-color-lightgray">
                              In your cart
                            </p>
                          )}

                          <p
                            className="cursor dotted-underline"
                            onClick={(e) =>
                              dispatch(
                                removeFromWishlist({ userId, productId })
                              )
                            }
                          >
                            Remove from wishlist
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

        {/* Cart container ends here */}
      </div>
    </div>
  );
};
