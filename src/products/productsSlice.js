import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById as fetchProductByIdAPI,
} from "./productsAPI";

// Async action: Ürünleri API'den çekme
export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductByIdAPI(id);
    return response;
  }
);

// Filtreleri uygulayan yardımcı fonksiyon
const applyFilters = (state) => {
  const { items, categoryFilter, priceFilter, searchQuery } = state;

  return items.filter((product) => {
    // Kategori filtreleme
    const matchesCategory = !categoryFilter
      ? true
      : product.category === categoryFilter;

    // Fiyat filtreleme - priceFilter null ise tüm fiyatları göster
    const matchesPrice = !priceFilter
      ? true
      : product.price >= priceFilter[0] &&
        (priceFilter[1] === Number.MAX_SAFE_INTEGER
          ? true
          : product.price <= priceFilter[1]);

    // Arama filtreleme
    const matchesSearch = !searchQuery
      ? true
      : product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    status: "idle", // 'loading', 'succeeded', 'failed'
    error: null,
    categoryFilter: "",
    priceFilter: null, // Başlangıçta null, seçildiğinde [min, max] array olacak
    searchQuery: "",
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
      state.filteredItems = applyFilters(state);
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
      state.filteredItems = applyFilters(state);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const product = action.payload;
        if (!state.items.find((item) => item.id === product.id)) {
          state.items.push(product);
        }
      });
  },
});

// Actions ve reducer export
export const { setCategoryFilter, setPriceFilter, setSearchQuery } =
  productsSlice.actions;

export default productsSlice.reducer;
