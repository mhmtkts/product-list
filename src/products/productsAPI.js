import axios from "axios";
import { API_CONFIG } from "../config/api";
import { handleApiError } from "../utils/errorHandler";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

export const fetchProducts = (limit = 200) => 
  handleApiError(() => api.get(`/products?limit=${limit}`))
    .then(data => data.products);

export const fetchProductById = (id) => 
  handleApiError(() => api.get(`/products/${id}`));

export const fetchProductsByCategory = (category) => 
  handleApiError(() => api.get(`/products?category=${category}`));

export const searchProducts = (query) => 
  handleApiError(() => api.get(`/products?search=${query}`));
