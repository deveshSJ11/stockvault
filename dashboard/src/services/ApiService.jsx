import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE;



// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // Added timeout for better error handling
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('API No Response:', error.request);
    } else {
      // Error in request setup
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==========================================
// LIVE DATA API CALLS
// ==========================================

export const getAllHoldings = async () => {
  try {
    const response = await api.get('/allHoldings');
    console.log('Holdings data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching holdings:', error);
    throw error;
  }
};

export const getAllPositions = async () => {
  try {
    const response = await api.get('/allPositions');
    console.log('Positions data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw error;
  }
};

export const searchStock = async (query) => {
  try {
    const response = await api.get(`/searchStock?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

export const getStockData = async (symbol) => {
  try {
    const response = await api.get(`/stockData/${symbol}`);
    console.log(`Stock data for ${symbol}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

// ==========================================
// ORDERS API CALLS
// ==========================================

export const getAllOrders = async () => {
  try {
    const response = await api.get('/allOrders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/newOrder', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/deleteOrder/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// ==========================================
// AUTH API CALLS
// ==========================================

export const signup = async (userData) => {
  try {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

export default api;