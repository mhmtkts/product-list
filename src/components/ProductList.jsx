import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
const ProductList = () => {
// filteredItems'ı kullanıyoruz, items yerine
const filteredProducts = useSelector((state) => state.products.filteredItems);
const [currentPage, setCurrentPage] = useState(1);
const PER_PAGE = 24;
// Filtreler değiştiğinde sayfa 1'e dön
const filters = useSelector((state) => ({
category: state.products.categoryFilter,
price: state.products.priceFilter,
search: state.products.searchQuery
}));
useEffect(() => {
setCurrentPage(1);
}, [filters.category, filters.price, filters.search]);
const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
const displayedProducts = filteredProducts.slice(
(currentPage - 1) * PER_PAGE,
currentPage * PER_PAGE
);
// Eğer filtrelenmiş ürün yoksa mesaj göster
if (filteredProducts.length === 0) {
return (
<div className="text-center py-8">
<p className="text-gray-500">Arama kriterlerinize uygun ürün bulunamadı.</p>
</div>
);
}
return (
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{displayedProducts.map((product) => (
<ProductCard key={product.id} product={product} />
))}
</div>
  {totalPages > 1 && (
    <div className="flex justify-center space-x-2 my-8">
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        Önceki
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 rounded ${
            currentPage === number 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        Sonraki
      </button>
    </div>
  )}
</div>
);
};
export default ProductList;