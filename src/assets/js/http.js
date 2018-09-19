/**
 * @Author JohnLi
 * @Date 2018/9/16 11:44
 */
import axios from 'axios';
import NProgress from 'nprogress';
const Notification = require('izitoast');

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
    withCredentials: config.withCredentials || true
  };

  // 设置请求参数
  axiosConfig.method === 'get' ? axiosConfig.params = config.data : axiosConfig.data = config.data;

  console.log(axiosConfig);
  return new Promise((resolve, reject) => {

    // 开启滚动条
    NProgress.start();

    axios(axiosConfig).then(function (response) {

      NProgress.done();

      if (response.data.code !== 0) {
        if (config.hasWarning) {
          Notification.show({
            title: 'Error',
            message: response.data.message
          });
        }
        reject(response.data.error_message);
      } else {
        resolve(response.data);
      }
    }).catch(function (error) {

      if (config.hasWarning) {
        Notification.show({
          title: 'Hey',
          message: 'What would you like to add?'
        });
      }
      reject(error);
    });
  });
}
