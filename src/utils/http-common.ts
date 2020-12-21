import axios from 'axios'
import { TokenService } from '../services/token.service'


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
})

instance.interceptors.response.use(function(response) {
  return response
}, function(error) {
  // reject promise if failed request is sent to /auth/token
  if(error.response.status === 401 && error.config.url !== '/auth/token') {
    return TokenService.getNewToken()
    .then(results => {
      const config = error.config
      config.headers['Authorization'] = `Bearer ${results}`
      return new Promise((resolve, reject) => {
        axios.request(error.config).then(results => {
          return resolve(results)
        }).catch(error => { 
          console.log('Reject 1')
          return reject(error)
         })
      })
    })
    .catch(error => {
      console.log('Reject 2')
      return Promise.reject(error)
    })
  } else {
    console.log('Reject 3')
    return Promise.reject(error)
  }

})

export default instance
