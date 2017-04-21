import axios from 'axios';

const fetch = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 添加一个发送拦截器
axios.interceptors.request.use(config => config, error => Promise.reject(error));

// 添加一个返回拦截器
fetch.interceptors.response.use((response) => {
  // 对返回的数据进行一些处理
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-console */
    console.log(`接口${response.config.url}返回：\n`, response);
  }
  return response;
}, (error) => {
  // 错误处理
  console.log(error);
  return Promise.reject(error);
});

export default fetch;
