import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Code splitting ile lazy loading
const Home = React.lazy(() => import('./pages/Home'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;