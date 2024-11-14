import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../products/productsSlice";
import { useDebounce } from "../hooks/useDebounce";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Debounced arama terimini Redux store'unda güncelle
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 pl-10 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search"
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}

export default SearchBar;
