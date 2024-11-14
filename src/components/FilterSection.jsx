import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setPriceFilter } from "../products/productsSlice";
import {
  generatePriceRanges,
  groupCategories,
  formatPrice,
} from "../utils/helpers";
function FilterSection() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const categories = groupCategories(products);
  const priceRanges = generatePriceRanges(products);
  const handleCategoryChange = (event) => {
    dispatch(setCategoryFilter(event.target.value));
  };

  const handlePriceRangeChange = (event) => {
    if (!event.target.value) {
      dispatch(setPriceFilter([]));
      return;
    }
    const [min, max] = event.target.value.split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      dispatch(setPriceFilter([min, max]));
    }
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <select
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Kategori filtresi"
      >
        <option value="">All Categories</option>
        {categories.map(({ name, count }) => (
          <option key={name} value={name}>
            {name} ({count})
          </option>
        ))}
      </select>

      <select
        onChange={handlePriceRangeChange}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Fiyat aralığı filtresi"
      >
        <option value="">Price Range</option>
        {priceRanges.map(({ min, max }) => (
          <option key={`${min}-${max}`} value={`${min}-${max}`}>
            {formatPrice(min)} - {formatPrice(max)}
          </option>
        ))}
      </select>
    </div>
  );
}
export default FilterSection;
