const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://entertainment-app-zopp.vercel.app';

const fetchWithAuth = async (url, options = {}) => {
  try {
    const { auth } = require('../firebase-config');
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
    const response = await fetch(url, {
      ...options,
      headers: { ...options.headers, ...headers }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    throw error;
  }
};

export const fetchTrending = async (limit = 8, page = 1) => {
  return fetchWithAuth(`${API_URL}/additional/trending?limit=${limit}&page=${page}`);
};

export const fetchRecommended = async (limit = 16, page = 1) => {
  return fetchWithAuth(`${API_URL}/additional/recommended?limit=${limit}&page=${page}`);
};

export const fetchBookmarks = async () => {
  const { auth } = require('../firebase-config');
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  return fetchWithAuth(`${API_URL}/bookmark`, { 
    method: 'POST', 
    body: JSON.stringify({ firebaseId: user.uid }) 
  });
};

export const fetchDetails = async (type, id) => {
  return fetchWithAuth(`${API_URL}/${type}/details/${id}`);
};

export const fetchSeries = async (limit = 16, page = 1) => {
  return fetchWithAuth(`${API_URL}/tvseries?limit=${limit}&page=${page}`);
};