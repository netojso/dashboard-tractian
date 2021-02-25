import axios from 'axios';

// Consumindo uma api usada por JSON-SERVER

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/tractian/fake-api/',
});

export default api;