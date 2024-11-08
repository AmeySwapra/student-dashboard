import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://student-backend-z2n5.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
