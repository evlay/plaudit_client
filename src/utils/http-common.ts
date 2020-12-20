import axios from 'axios'
import store from '../store'


const instance = axios.create({
  baseURL: `http://localhost:3000`,
  headers: { 'Content-Type': 'application/json'}
})

instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('plauditAuthToken')
  if(token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function(err) {
  return Promise.reject(err);
});

export default instance
