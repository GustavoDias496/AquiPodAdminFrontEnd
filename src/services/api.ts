import axios from "axios";

const getToken = (): string | null => {
  return sessionStorage.getItem('token');
};

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

// Interceptar cada solicitação antes de ser enviada
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
      // Adicionar o token ao cabeçalho Authorization se estiver disponível
      config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const baseURL = api.defaults.baseURL;

export default api;
