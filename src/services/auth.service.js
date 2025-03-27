import axios from 'axios';

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api';

const setupAxiosInterceptors = (token) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

const authService = {
  async register(username, email, password, firstName, lastName) {
    return axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
      role: ["user"],
      info: `${firstName} ${lastName}`
    });
  },

  async login(username, password) {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      username,
      password
    });
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      setupAxiosInterceptors(response.data.accessToken);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export default authService;