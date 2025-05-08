import axios from 'axios';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
//请求拦截器‌：处理Token、统一添加Header
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
//响应拦截器‌：全局错误处理
instance.interceptors.response.use(
  response => {
    // 可提取核心数据如 response.data
    return response.data;
  },
  error => {
    // 处理HTTP状态码
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token'); // 清除过期凭证:ml-citation{ref="1,8" data="citationList"}
          window.location.href = '/login';
          break;
        case 404:
          alert('资源不存在');
          break;
        // 其他状态码处理
      }
    }
    return Promise.reject(error);
  }
);
// 导出 axios 实例
export default instance;
