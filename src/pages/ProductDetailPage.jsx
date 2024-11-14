import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchProductById } from "../products/productsSlice";
import { formatPrice, generateMetaTags, calculateDiscountedPrice } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";

function formatName(name) {
  const [firstName, lastName] = name.split(" ");
  const maskedFirstName = firstName.charAt(0) + "*".repeat(firstName.length - 1);
  const maskedLastName = lastName.charAt(0) + "*".repeat(lastName.length - 1);
  return `${maskedFirstName} ${maskedLastName}`;
}

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const product = useSelector((state) => {
    if (!state.products.items) {
      return null;
    }
    return state.products.items.find((item) => item.id === parseInt(id));
  });

  useEffect(() => {
    if (!product) {
      setLoading(true);
      dispatch(fetchProductById(id))
        .unwrap()
        .catch((error) => console.error("Ürün yüklenemedi:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, id, product]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl text-red-500">Ürün bulunamadı.</h2>
        <p className="mt-4 text-gray-600">
          Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
        </p>
      </div>
    );
  }

  const meta = generateMetaTags(product);
  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.ogImage} />
      </Helmet>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-100">
            <img
              src={product.images}
              alt={product.title}
              className="rounded-lg shadow-lg w-full h-auto max-h-80 object-contain"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.floor(product.rating)
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
                <span className="ml-2 text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviews.length})
                </span>
              </div>
            </div>

            <p className="text-lg font-semibold text-gray-600 mt-4">
              {discountedPrice !== product.price && (
                <span className="line-through text-gray-400 mr-2">
                  {formatPrice(product.price)}
                </span>
              )}
              {formatPrice(discountedPrice)}
            </p>
            {discountedPrice !== product.price && (
              <p className="text-xl font-bold text-red-500 mt-1">
                -{product.discountPercentage}%
              </p>
            )}

            <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>

            <div className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Product Features</h3>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                <li>Warranty Period: {product.warrantyInformation}</li>
                <li>Delivery Time: {product.shippingInformation}</li>
                <li>Stock Status: {product.availabilityStatus}</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3
                className="text-lg font-semibold text-gray-800 flex items-center cursor-pointer"
                onClick={() => setShowReviews(!showReviews)}
              >
                Reviews
                <span className="ml-2 transform transition-transform duration-300">
                  {showReviews ? "▲" : "▼"}
                </span>
              </h3>
              {showReviews && product.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 py-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(review.rating)
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
                      <span className="ml-2 text-gray-600">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="ml-4 text-gray-600">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}{" "}
                      | {formatName(review.reviewerName)}
                    </p>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Sepete ekle"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
