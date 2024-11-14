import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setPriceFilter } from "../products/productsSlice";
import {
  generatePriceRanges,
  groupCategories,
} from "../utils/helpers";

function FilterSection() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const priceFilter = useSelector((state) => state.products.priceFilter);
  
  const categories = groupCategories(products);
  const priceRanges = generatePriceRanges(products);

  const handleCategoryChange = (event) => {
    dispatch(setCategoryFilter(event.target.value));
  };

  const handlePriceRangeChange = (event) => {
    if (!event.target.value) {
      dispatch(setPriceFilter(null));
      return;
    }
    
    const [min, maxStr] = event.target.value.split("-");
    const max = maxStr === "inf" ? Number.MAX_SAFE_INTEGER : Number(maxStr);
    
    if (!isNaN(min) && !isNaN(max)) {
      dispatch(setPriceFilter([Number(min), max]));
    }
  };

  // Aktif fiyat aralığı değerini hesapla
  const activePriceRangeValue = priceFilter 
    ? `${priceFilter[0]}-${priceFilter[1] === Number.MAX_SAFE_INTEGER ? "inf" : priceFilter[1]}`
    : "";

  return (
    <div className="flex flex-row space-x-4">
      <select
        value={categoryFilter}
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 rounded-lg bg-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 hover:border-gray-400 transition-colors"
        aria-label="Category filter"
      >
        <option value="">All Categories</option>
        {categories.map(({ name, count }) => (
          <option key={name} value={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)} ({count})
          </option>
        ))}
      </select>

      <select
        value={activePriceRangeValue}
        onChange={handlePriceRangeChange}
        className="p-2 border border-gray-300 rounded-lg bg-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 hover:border-gray-400 transition-colors"
        aria-label="Price range filter"
      >
        <option value="">All Prices</option>
        {priceRanges.map(({ min, max, count, label }) => (
          <option 
            key={`${min}-${max}`} 
            value={`${min}-${max === Number.MAX_SAFE_INTEGER ? "inf" : max}`}
          >
            {label} ({count})
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSection;