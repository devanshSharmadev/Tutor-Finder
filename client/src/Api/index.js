import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const signIn = (formData) => API.post('/signin', formData);
export const signUp = (formData) => API.post('/signup', formData);
export const fetchPost = (id,user) => API.post(`/${id}`,{user});
export const fetchPosts = (page) => API.get(`/?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>  API.get(`/search?searchQuery=${searchQuery.search || 'none'}&pins=${searchQuery.pins}`);
export const comment = (value, id) => API.post(`/${id}/commentPost`, { value });
