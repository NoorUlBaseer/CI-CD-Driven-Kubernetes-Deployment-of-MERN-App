import axios from 'axios';
import { API_URL } from '../config/constants';

// Get token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Create auth header
const authHeader = () => {
  const token = getToken();
  
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/products`,
      productData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/products/${id}`,
      productData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/products/${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};