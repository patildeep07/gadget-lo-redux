import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { ProductListing } from "../../components/Product-listing/ProductListing";
import { addToCart, addToWishlist } from "../../features/Users/UserSlice";
import { useEffect } from "react";
import { getAllProducts } from "../../features/Products/ProductSlice";

export const ProductDetails = () => {
  // Get product id form url
  const { productId } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.users);
  const { isLoggedIn, status } = user;

  // Get all products
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllProducts());
    }
  }, [status, dispatch]);

  // Shuffled products

  const shuffledProducts = products
    .map((value) => ({
      value,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const suggestedProducts = shuffledProducts.slice(0, 4);

  // Product details

  const displayProduct = products.find((product) => product._id === productId);

  const defaultObj = {
    _id: "def",
    productName: "def",
    productDescription: "def",
    averageRating: { $numberDecimal: 0 },
    brandName: "def",
    category: "def",
    discountPrice: 0,
    features: [],
    price: 0,
    reviews: [],
  };

  const {
    _id,
    productName,
    productImage,
    productDescription,
    averageRating,
    brandName,
    category,
    discountPrice,
    features,
    price,
    reviews,
  } = displayProduct || defaultObj;

  // Wishlist button handler

  const wishlistButtonHandler = () => {
    try {
      const userId = user.currentUser._id;
      dispatch(addToWishlist({ userId, productId: _id }));
    } catch (error) {
      console.log(error);
    }
  };

  const cartButtonHandler = () => {
    try {
      const userId = user.currentUser._id;
      dispatch(addToCart({ userId, productId: _id }));
    } catch (error) {
      console.log(error);
    }
  };

  // UI
  return (
    <div className="flex-column">
      {_id === "def" && (
        <div className="loading-container">
          <div className="custom-loader"></div>
        </div>
      )}

      {/* If user directly comes at product link this will show only the loader animation, and not throw errors */}
      {_id !== "def" && (
        <div className="product-container ">
          {/* IMAGE, ADD TO CART & WISHLIST BUTTONS */}
          <div className="image-button-section flex-gap-20px">
            <div className="border-1px-lightgray padding-10px align-center">
              <img
                className="product-image"
                alt={productName}
                src={productImage}
              />
            </div>

            <div className="button-container">
              <button
                disabled={isLoggedIn ? false : true}
                onClick={cartButtonHandler}
                className={`add-to-cart-button ff9f00 ${
                  isLoggedIn ? "enable" : "disabled"
                }`}
              >
                Add to cart
              </button>
              <button
                disabled={isLoggedIn ? false : true}
                onClick={() => wishlistButtonHandler()}
                className={`add-to-wishlist-button fb641b ${
                  isLoggedIn ? "enable" : "disabled"
                }`}
              >
                Add to wishlist
              </button>
            </div>
          </div>

          {/* DESCRIPTION OF THE PRODUCT */}
          <div className="content-section">
            {/* Breadcrumb */}
            <p className="breadcrumb">
              <span>Home</span> {" > "} <span>{category}</span> {" > "}
              <span>{brandName}</span> {" > "} <span>{productName}</span>
            </p>

            <p className="product-title">
              {brandName} {productName}
            </p>
            <p>ID: {_id}</p>

            <div className="flex-row gap-10px">
              <div
                className={`rating-container ${
                  Number(averageRating.$numberDecimal) > 2.5 ? "green" : "red"
                } `}
              >
                <p>{averageRating.$numberDecimal} ⭐</p>
              </div>
              <p>Verified</p>
            </div>

            {discountPrice ? (
              <div className="flex-row gap-10px">
                <p className="bold">Rs. {discountPrice}</p>
                <p className="strikethrough">Rs. {price}</p>
                <p className="font-green">
                  ( {100 - parseInt((discountPrice / price) * 100)} % off )
                </p>
              </div>
            ) : (
              <p>Rs. {price}</p>
            )}

            <div className="border-1px-lightgray padding-10px flex-gap-10px">
              <p className="product-subtitle">Description</p>
              <hr />
              <p>{productDescription}</p>
            </div>

            <div className="border-1px-lightgray padding-10px flex-gap-10px">
              <p className="product-subtitle">Features:</p>
              <hr />
              <ul>
                {features.map((feature, idx) => {
                  return <li key={idx}>{feature}</li>;
                })}
              </ul>
            </div>

            <div className="border-1px-lightgray padding-10px">
              <p className="product-subtitle">Reviews:</p>
              {reviews.length === 0 ? (
                <p>Be the first one to review this product.</p>
              ) : (
                reviews.map((review) => {
                  return (
                    <div key={review._id} className="review-container">
                      <div className="flex-row gap-10px">
                        <div>
                          <p
                            className={`rating-container ${
                              Number(averageRating.$numberDecimal) > 2.5
                                ? "green"
                                : "red"
                            } `}
                          >
                            {review.userRating} ⭐
                          </p>
                        </div>
                        <p>{review.text}</p>
                      </div>
                      <p>Reviewed by: {review.user.userName}</p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Product container End */}
          </div>

          <div className="border-1px-lightgray padding-10px flex-gap-10px width-100 ">
            <p className="product-subtitle">You may also like:</p>
            <hr />
            <ProductListing products={suggestedProducts} />
          </div>
        </div>
      )}

      {/* End */}
    </div>
  );
};
