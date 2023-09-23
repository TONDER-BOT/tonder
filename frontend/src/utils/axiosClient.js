import axios from 'axios';

const client = axios.create({
  baseURL: 'https://ethp.onrender.com',
});

export default client;
