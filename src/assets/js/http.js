import axios from 'axios';
import NProgress from 'nprogress';
import Notification from './utils/notification';
import globalConfig from './config';
import { router } from '../../router/index';

let xhrCacheList = [];
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

export default function Http (config) {
  const obj = {};
  const axiosConfig = {
    method: config.method || 'get',
    url: globalConfig.SERVER_ADDRESS + config.url,
    withCredentials: config.withCredentials || true,
    headers: Object.assign({}, { 'Content-Type': 'application/json' }, config.headers),
    cancelToken: new CancelToken(function executor (cancel) {
      obj.cancel = function () {
        // 如果是取消的请求，则在失败时也不现实错误提示
        obj.config.showErrorMsg = false;

        cancel();
      };
    })
  };

  obj.config = config;

  // 设置请求参数
  axiosConfig.method === 'get'
    ? axiosConfig.params = config.data
    : axiosConfig.data = config.data;

  obj.xhrInstance = new Promise((resolve, reject) => {

    // 开启滚动条
    NProgress.start();

    axios(axiosConfig).then(response => {
      const data = response.data;

      // 登录验证
      loginCheck(data);

      if (data.code !== 0) {
        if (config.showErrorMsg) {
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

      if (config.showErrorMsg) {
        Notification.error(error.message);
      }
      reject(error);
    }).finally(() => {

      // 关闭loading
      if (config.loading) {
        obj.loadingInstance.close();
      }

      // 更新请求缓存列表
      const xhrIndex = xhrCacheList.indexOf(obj);
      xhrCacheList.splice(xhrIndex, 1);

      if (xhrCacheList.length === 0) {
        NProgress.done();
      }

    });
  });

  if (config.loading) {
    obj.loadingInstance = this.$loading({
      target: config.loading,
      spinner: 'app-loading'
    });
  }

  xhrCacheList.push(obj);

  return obj;
}

Http.cancelAll = function () {
  xhrCacheList.forEach(item => {
    item.cancel();
  });

  // 清空请求缓存列表
  xhrCacheList = [];
};

Http.getXhrCacheList = function () {
  return xhrCacheList;
};

// 用户未登录处理
function loginCheck (response) {
  // 未登录
  if (response.code === -1000) {
    router.push('/login');
  }
}
