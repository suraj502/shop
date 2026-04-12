import axios from 'axios';

// For production (Vercel): use /api (routed to serverless function)
// For local development: use http://localhost:5000/api
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (isLocalhost ? 'http://localhost:5000/api' : '/api');

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// ==================== API CALLS ====================

// Get all products
export const getAllProducts = async () => {
  try {
    console.log('📤 API Call: GET /api/products');
    const response = await api.get('/products');
    console.log('📥 Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    console.log(`📤 API Call: GET /api/products/${id}`);
    const response = await api.get(`/products/${id}`);
    console.log('📥 Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching product ${id}:`, error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    console.log(`📤 API Call: GET /api/products/category/${category}`);
    const response = await api.get(`/products/category/${category}`);
    console.log('📥 Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// Health check
export const checkBackendHealth = async () => {
  try {
    console.log('📤 API Call: GET /api/health');
    const response = await api.get('/health');
    console.log('📥 Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error checking backend health:', error);
    throw error;
  }
};

export default api;
