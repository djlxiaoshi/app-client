/**
 * @Author JohnLi
 * @Date 2018/9/16 11:44
 */
import axios from 'axios';
import NProgress from 'nprogress';
import Notification from './notification';

// 请求发送拦截
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 增加响应拦截器（判断用户是否登录）
axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default function http (config) {
  const axiosConfig = {
    method: config.method || 'get',
    url: config.url,
    withCredentials: config.withCredentials || true,
    headers: {'Content-Type': 'application/json'}
  };

  // 设置请求参数
  axiosConfig.method === 'get'
    ? axiosConfig.params = JSON.stringify(config.data)
    : axiosConfig.data = config.data;

  return new Promise((resolve, reject) => {

    // 开启滚动条
    NProgress.start();

    axios(axiosConfig).then(function (response) {

      const data = response.data;

      NProgress.done();

      if (data.code !== 0) {
        if (config.hasWarning) {
          Notification.error(data.message);
        }
        reject(data.message);
      } else {
        resolve(data.data);
      }
    }).catch(function (error) {

      if (config.hasWarning) {
        Notification.error(error.message);
      }
      reject(error);
    });
  });
}
