import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchProductById } from "../products/productsSlice";
import { formatPrice, generateMetaTags } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
              src={product.thumbnail}
              alt={product.title}
              className="rounded-lg shadow-lg w-full h-auto max-h-80 object-contain"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-lg font-semibold text-gray-600 mt-2">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Kategori: {product.category}
            </p>

            <div className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <button
                className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Sepete ekle"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
