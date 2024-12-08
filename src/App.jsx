import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";

// Code splitting ile lazy loading
const Home = React.lazy(() => import("./pages/Home"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
