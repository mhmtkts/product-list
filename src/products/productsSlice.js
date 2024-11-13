import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById as fetchProductByIdAPI  } from './productsAPI';
// Async action: Ürünleri API'den çekme
export const loadProducts = createAsyncThunk(
'products/loadProducts',
async () => {
const response = await fetchProducts();
return response;
}
);
export const fetchProductById = createAsyncThunk(
'products/fetchProductById',
async (id) => {
const response = await fetchProductByIdAPI(id);
return response;
}
);
const productsSlice = createSlice({
name: 'products',
initialState: {
items: [],
filteredItems: [],
status: 'idle', // 'loading', 'succeeded', 'failed'
error: null,
categoryFilter: '',
priceFilter: [0, 1000],
searchQuery: '',
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
state.status = 'loading';
})
.addCase(loadProducts.fulfilled, (state, action) => {
state.status = 'succeeded';
state.items = action.payload;
state.filteredItems = action.payload; // Varsayılan olarak tüm ürünleri göster
})
.addCase(loadProducts.rejected, (state, action) => {
state.status = 'failed';
state.error = action.error.message;
})
.addCase(fetchProductById.fulfilled, (state, action) => {
const product = action.payload;
if (!state.items.find(item => item.id === product.id)) {
state.items.push(product);
}
});
},
});
// Filtreleri uygulayan yardımcı fonksiyon
const applyFilters = (state) => {
const { items, categoryFilter, priceFilter, searchQuery } = state;
return items.filter((product) => {
const matchesCategory = !categoryFilter ? true : product.category === categoryFilter;
const matchesPrice = !priceFilter.length ? true :
(product.price >= priceFilter[0] && product.price <= priceFilter[1]);
const matchesSearch = !searchQuery ? true :
(product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
product.description?.toLowerCase().includes(searchQuery.toLowerCase()));
return matchesCategory && matchesPrice && matchesSearch;
});
};
// Reducer ve actionları export ediyoruz
export const { setCategoryFilter, setPriceFilter, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;