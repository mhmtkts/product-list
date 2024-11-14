/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useImageLazyLoading } from "../hooks/useDebounce";
import {
  formatPrice,
  truncateText,
  getImagePlaceholder,
  calculateDiscountedPrice,
} from "../utils/helpers";

const ProductCard = ({ product }) => {
  const {
    title,
    price,
    description,
    category,
    thumbnail,
    rating,
    discountPercentage,
  } = product;
  const { loaded, error } = useImageLazyLoading(thumbnail);
  const discountedPrice = calculateDiscountedPrice(price, discountPercentage);

  return (
    <div className="product-card border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative h-48 mb-4">
          {!loaded && !error && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
          )}
          {error && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image failed to load</span>
            </div>
          )}
          <img
            src={loaded ? thumbnail : getImagePlaceholder()}
            alt={title}
            className={`w-full h-full object-cover rounded-t-lg ${
              !loaded && "hidden"
            }`}
          />
        </div>
        <div className="p-2">
          <h2 className="text-lg font-semibold mb-1">{title}</h2>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {truncateText(description, 100)}
          </p>
          <p className="text-md font-bold text-gray-700">
            {discountedPrice !== price && (
              <span className="line-through text-gray-400 mr-2">
                {formatPrice(price)}
              </span>
            )}
            {formatPrice(discountedPrice)}
          </p>
          {discountedPrice !== price && (
            <p className="text-red-500 font-bold">-{discountPercentage}%</p>
          )}
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
