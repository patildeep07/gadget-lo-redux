import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const {
    _id,
    productName,
    brandName,
    productImage,
    price,
    discountPrice,
    averageRating,
    createdAt,
  } = product;
  return (
    <div className="product-card flex-column">
      <img
        alt={productName}
        src={productImage}
        className="product-card-image"
      />

      <div className="card-content-container">
        <h4>{productName}</h4>
        <div className="flex-row gap-10px">
          <p>{brandName}</p>
        </div>

        {discountPrice ? (
          <p style={{ fontWeight: "500" }}>
            Rs. {discountPrice}{" "}
            <span style={{ fontWeight: "400", textDecoration: "line-through" }}>
              Rs. {price}
            </span>{" "}
            <span style={{ color: "green" }}>
              {parseInt((discountPrice / price) * 100)}% off
            </span>
          </p>
        ) : (
          <p>Rs. {price}</p>
        )}
      </div>
    </div>
  );
};
