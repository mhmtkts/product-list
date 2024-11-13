/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useImageLazyLoading } from '../hooks/useDebounce';
import { formatPrice, truncateText, getImagePlaceholder } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { title, price, description, category, thumbnail } = product;
  const { loaded, error } = useImageLazyLoading(thumbnail);

  return (
    <div className="product-card border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block h-full"> 
        <div className="relative h-48 mb-4">
          {!loaded && !error && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
          )}
          {error && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Resim yüklenemedi</span>
            </div>
          )}
          <img
            src={loaded ? thumbnail : getImagePlaceholder()}
            alt={title}
            className={`w-full h-full object-cover rounded-t-lg ${!loaded && 'hidden'}`}
          />
        </div>
        <div className="p-2">
          <h2 className="text-lg font-semibold mb-1">{title}</h2>
          <p className="text-sm text-gray-600">{truncateText(description, 100)}</p>
          <p className="text-md font-bold text-blue-500">{formatPrice(price)}</p>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;