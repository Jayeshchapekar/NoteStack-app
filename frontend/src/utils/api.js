
import axios from 'axios';

const API_URL =
  `${window.location.protocol}//${window.location.hostname}:8000`;


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNotes = async () => {
  const response = await api.get('/api/notes');
  return response.data;
};

export const getNote = async (id) => {
  const response = await api.get(`/api/notes/${id}`);
  return response.data;
};

export const createNote = async (note) => {
  const response = await api.post('/api/notes', note);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/api/notes/${id}`);
  return response.data;
};

export default api;
