/* eslint-disable no-useless-catch */
import axios from 'axios';

// API'nin base URL'ini tanımlayalım
const baseURL = 'https://dummyjson.com';

// Axios instance oluşturalım
const api = axios.create({
  baseURL,
  timeout: 10000, // 10 saniye timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tüm ürünleri getir
export const fetchProducts = async (limit = 200) => {
  try {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data.products;
  } catch (error) {
    throw error;
  }
};

// Tek bir ürün detayını getir
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Kategoriye göre ürünleri getir
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Arama sonuçlarını getir
export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products?search=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};