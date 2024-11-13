import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { loadProducts } from "../products/productsSlice";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";

function Home() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const loading = useSelector((state) => state.products.status === "loading");

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Ürün Listesi | ProductStore</title>
        <meta
          name="description"
          content="En kaliteli ürünler uygun fiyatlarla ProductStore'da!"
        />
        <meta name="keywords" content="online alışveriş, ürünler, e-ticaret" />
      </Helmet>

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Ürün Listesi
        </h1>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <SearchBar />
          <FilterSection />
        </div>

        <ProductList />
      </div>
    </>
  );
}

export default Home;
