/**
 * @Author JohnLi
 * @Date 2018/9/16 11:44
 */
import axios from 'axios';
import NProgress from 'nprogress';
import Notification from './utils/notification';
import globalConfig from './config';
import { router } from '../../router/index';

let xhrCache = []; // 请求池
let cancelCache = []; // 取消请求池
let loadingCache = []; // loading状态存储池
const CancelToken = axios.CancelToken;

// 请求发送拦截
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 增加响应拦截器（判断用户是否登录）
axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  return Promise.reject(error);
});

function getXhrInstanceIndex (xhr) {
  return xhrCache.indexOf(xhr);
}

// 更新缓存池
function updateCache (index) {
  cancelCache.splice(index, 1);
  xhrCache.splice(index, 1);
  loadingCache.splice(index, 1);
}

// 设置进度条
function setNProgress () {
  if (xhrCache.length === 0) {
    NProgress.done();
  }
}

export default function http (config) {
  const axiosConfig = {
    method: config.method || 'get',
    url: globalConfig.SERVER_ADDRESS + config.url,
    withCredentials: config.withCredentials || true,
    headers: Object.assign({}, { 'Content-Type': 'application/json' }, config.headers),
    cancelToken: new CancelToken(function executor (cancel) {
      cancelCache.push(cancel);
    })
  };

  // 设置请求参数
  axiosConfig.method === 'get'
    ? axiosConfig.params = config.data
    : axiosConfig.data = config.data;

  return new Promise((resolve, reject) => {

    // 开启滚动条
    NProgress.start();

    // todo 这里可以把loading参数和loadingTarget参数合并
    let loadingInstance = config.loading
      ? this.$loading({
        target: config.loadingTarget,
        spinner: 'app-loading'
      })
      : null;

    loadingCache.push(loadingInstance);

    const axiosInstance = axios(axiosConfig).then(function (response) {

      const data = response.data;

      // 登录判断
      loginCheck(data);

      if (data.code !== 0) {
        if (config.hasWarning) {
          Notification.error(data.message);
        }
        reject(data.message);
      } else {
        if (config.showSuccessMsg) {
          Notification.success(data.message);
        }
        resolve(data.data);
      }
    }).catch(function (error) {

      if (config.hasWarning) {
        Notification.error(error.message);
      }
      reject(error);
    }).finally(() => {

      const axiosInstanceIndex = getXhrInstanceIndex(axiosInstance);

      if (config.loading) {
        loadingCache[axiosInstanceIndex].close();
      }

      // 更新缓存池
      updateCache(axiosInstanceIndex);

      setNProgress();
    });

    xhrCache.push(axiosInstance);
  });
}

// 用户未登录处理
function loginCheck (response) {
  // 未登录
  if (response.code === -1000) {
    router.push('/login');
  }
}

export function cancelAll () {
  cancelCache.forEach(cancel => {
    cancel();
  });

  cancelCache = [];
  xhrCache = [];
  loadingCache = [];
}
