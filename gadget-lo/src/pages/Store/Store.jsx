import "./Store.css";

import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../features/Products/ProductSlice";
import { ProductListing } from "../../components/Product-listing/ProductListing";

export const Store = () => {
  document.title = "Store";

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.allProducts);
  const status = useSelector((state) => state.products.status);

  // console.log({ products });

  // Available categories
  const availableCategories = products.reduce(
    (acc, curr) =>
      acc.includes(curr.category) ? acc : [...acc, curr.category],
    []
  );

  // #######################################################################################

  // Set parameters

  const [parameters, setParameters] = useSearchParams({
    currentPage: 1,
    postsToShow: 8,
    sortByPrice: "default",
    sortByPriceHighToLow: false,
    sortByPriceLowToHigh: false,
    priceRange: 200000,
    selectedCategory: "All",
    selectedRating: 1,
  });
  const currentPageNumber = parameters.get("currentPage");
  const postsToShow = parameters.get("postsToShow");
  const priceRange = parameters.get("priceRange");
  const selectedCategory = parameters.get("selectedCategory");
  const selectedRating = parameters.get("selectedRating");
  const sortByPriceHighToLow = parameters.get("sortByPriceHighToLow");
  const sortByPriceLowToHigh = parameters.get("sortByPriceLowToHigh");

  const allRatings = [4, 3, 2, 1];

  // #########################################################
  // ############### Filter Module starts here #################
  // #########################################################

  const filterByPriceHighToLow =
    sortByPriceHighToLow === "false"
      ? [...products]
      : [...products].sort(
          ({ discountPrice: priceOfA }, { discountPrice: priceOfB }) => {
            return priceOfB - priceOfA;
          }
        );

  const filterByPriceLowToHigh =
    sortByPriceLowToHigh === "false"
      ? [...filterByPriceHighToLow]
      : [...filterByPriceHighToLow].sort(
          ({ discountPrice: priceOfA }, { discountPrice: priceOfB }) => {
            return priceOfA - priceOfB;
          }
        );

  const filterByPriceRange = filterByPriceLowToHigh.filter(
    (product) => product.discountPrice < Number(priceRange)
  );

  const filterByCategory =
    selectedCategory === "All"
      ? filterByPriceRange
      : filterByPriceRange.filter(
          (product) => product.category === selectedCategory
        );

  const filterByRating = filterByCategory.filter(
    (product) =>
      product.averageRating.$numberDecimal > parseFloat(selectedRating)
  );

  // #########################################################
  // ############### Filter Module ends here #################
  // #########################################################

  // #########################################################
  // ########## Pagination Module starts here ################
  // #########################################################

  const lastPost = currentPageNumber * postsToShow;
  const firstPost = lastPost - postsToShow;

  const totalPages =
    parseInt(filterByRating.length / postsToShow) <
    filterByRating.length / postsToShow
      ? parseInt(filterByRating.length / postsToShow) + 1
      : parseInt(filterByRating.length / postsToShow);
  const displayProducts = filterByRating.slice(firstPost, lastPost);
  // console.log({ displayProducts });

  const arrayOfPages = Array.from(Array(totalPages).keys());

  // #########################################################
  // ########## Pagination Module ends here ################
  // #########################################################

  // Get all products
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllProducts());
    }
  }, [status, dispatch]);

  // End
  return (
    <div className="store">
      <div className="flex-row gap-15px align-start store-container">
        {/* Filters */}
        <div className="filter-column">
          <h3 className="margin-10px-0px">Filters</h3>
          <hr />

          {/* Price */}
          <div className="filter-container">
            <div className="flex-row space-between">
              <h3>Price</h3>
              <button
                className="clear-btn"
                onClick={() =>
                  setParameters(
                    (prev) => {
                      prev.set("sortByPriceHighToLow", false);
                      prev.set("sortByPriceLowToHigh", false);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                Reset
              </button>
            </div>

            <div className="flex-row gap-10px">
              <input
                type="radio"
                id="highToLow"
                checked={sortByPriceHighToLow === "true" ? true : false}
                name="sortByPrice"
                onChange={() =>
                  setParameters(
                    (prev) => {
                      prev.set("sortByPriceHighToLow", true);
                      prev.set("sortByPriceLowToHigh", false);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              />
              <label htmlFor="highToLow">High to Low</label>
            </div>

            <div className="flex-row gap-10px">
              <input
                type="radio"
                id="lowToHigh"
                checked={sortByPriceLowToHigh === "true" ? true : false}
                name="sortByPrice"
                onChange={() =>
                  setParameters(
                    (prev) => {
                      prev.set("sortByPriceLowToHigh", true);
                      prev.set("sortByPriceHighToLow", false);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              />
              <label htmlFor="lowToHigh">Low to High</label>
            </div>
          </div>

          {/* Price range */}
          <div className="filter-container">
            <div className="flex-row space-between">
              <h3>Price Range</h3>
              <button
                className="clear-btn"
                onClick={(e) =>
                  setParameters(
                    (prev) => {
                      prev.set("priceRange", 200000);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                Reset
              </button>
            </div>

            <div className="flex-row gap-10px margin-10px-0px">
              <input
                className="input-slider"
                type="range"
                min={0}
                max={200000}
                step={5000}
                onChange={(e) =>
                  setParameters((prev) => {
                    prev.set("priceRange", e.target.value);
                    return prev;
                  })
                }
                value={priceRange}
              />
              <input
                className="range-input"
                type="number"
                value={priceRange}
                onChange={(e) =>
                  setParameters((prev) => {
                    prev.set("priceRange", e.target.value);
                    return prev;
                  })
                }
              />
            </div>
          </div>

          {/* Categories */}
          <div className="filter-container">
            <div className="flex-row space-between">
              <h3>Categories</h3>
              <button
                className="clear-btn"
                onClick={(e) =>
                  setParameters(
                    (prev) => {
                      prev.set("selectedCategory", "All");
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                Reset
              </button>
            </div>

            {availableCategories.map((category, idx) => {
              return (
                <div key={idx} className="flex-row gap-10px">
                  <input
                    type="radio"
                    id={category}
                    value={category}
                    checked={selectedCategory === category ? true : false}
                    onChange={(e) =>
                      setParameters((prev) => {
                        prev.set("selectedCategory", category);
                        return prev;
                      })
                    }
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              );
            })}
          </div>

          {/* Ratings */}
          <div className="filter-container">
            <div className="flex-row space-between">
              <h3>Ratings</h3>
              <button
                className="clear-btn"
                onClick={(e) =>
                  setParameters(
                    (prev) => {
                      prev.set("selectedRating", 1);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              >
                Reset
              </button>
            </div>

            {allRatings.map((rating, idx) => {
              return (
                <div key={idx} className="flex-row gap-10px">
                  <input
                    type="radio"
                    id={rating}
                    value={rating}
                    checked={Number(selectedRating) === rating ? true : false}
                    onChange={(e) =>
                      setParameters((prev) => {
                        prev.set("selectedRating", rating);
                        return prev;
                      })
                    }
                  />
                  <label htmlFor={rating}>{rating} stars & above</label>
                </div>
              );
            })}
          </div>

          {/* End filter options */}
        </div>

        {/* Products */}
        <div className="store-column">
          <h3 className="margin-10px-0px">
            Products{" "}
            <span className="font-light">
              (Showing {displayProducts.length} of {filterByRating.length})
            </span>
          </h3>
          <hr className="margin-10px-0px" />

          {status === "loading" && (
            <div className="loading-container">
              <div className="custom-loader"></div>
            </div>
          )}
          <ProductListing products={displayProducts} />

          <hr />
          <div className="pagination flex-row justify-content-centre flex-wrap gap-25px">
            <p>
              Page {currentPageNumber} of {totalPages}
            </p>

            <div className="flex-row ">
              {arrayOfPages.map((e, idx) => {
                return (
                  <p
                    key={idx}
                    style={{
                      backgroundColor:
                        idx + 1 === parseInt(currentPageNumber)
                          ? "#2874f0"
                          : "white",
                      fontSize: "18px",
                      fontWeight: "700",
                      padding: "10px",
                      borderRadius: "10px",
                      color:
                        idx + 1 === parseInt(currentPageNumber)
                          ? "white"
                          : "black",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setParameters((prev) => {
                        prev.set("currentPage", idx + 1);
                        return prev;
                      })
                    }
                  >
                    {idx + 1}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* End */}
    </div>
  );
};
