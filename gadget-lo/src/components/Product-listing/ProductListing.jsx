import { ProductCard } from "./ProductCard";

export const ProductListing = ({ products }) => {
  return (
    <div className="flex-row align-start flex-wrap justify-content-centre">
      {products.map((item) => {
        return <ProductCard key={item._id} product={item} />;
      })}
    </div>
  );
};
