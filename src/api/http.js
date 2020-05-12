/**
 * author: liuhui
 * description: 封装axios
 * date: 2019-12-09
 */
import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router';
import Store from "../vuex/store"
import myUtils from '../util/customFunction'

export let baseURL;
export let NODE_ENV;
export let domain;

NODE_ENV = 'easypark';

// domain = "http://"+ window.location.host+"/"
// domain='http://debug.easy-parking.cn/';
domain="https://easy-parking.cn/"

baseURL = domain + NODE_ENV + '/';
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 30000;     //响应时间

/**
 * author:
 * description： axios拦截所有的请求，为请求加上一个token
 */
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['api-version'] = '1.0';
    const token = Store.get("user_token");
    if (token) {
      config.headers.Authorization = token
    } else {
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      });
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
/**
 * author: 
 * description : axios 拦截响应，分别对响应做出处理。
 */
axios.interceptors.response.use(
  response => {
    if (response.data.status !== 200 && response.data.desc) {
      // debugger
      Message.error(response.data.desc)
    }
    return response;
  },
  error => {
    console.error("响应错误", error.response);
    if (error && error.response) { 
      switch (error.response.status) {
        case 401:
          Message({ message: '会话已过期，请重新登录!', type: 'error' });
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        case 500:
          Message({ message: error.response.data.message || '服务器内部错误', type: 'error' });
          break;
        default:
          Message({ message: error.response.data.desc, type: 'error' });
          break;
      }
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  });

/**
 * author: 
 * description: axios get方法封装
 * @param url 路径
 * @param params 参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * author: 
 * description: axios post方法封装
 * @param url   路径
 * @param params  参数
 * @returns {Promise}
 */
export function post(url, params) {
  params = myUtils.setNullStringToNull(params);
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(response => {
      resolve(response);
    }, err => {
      reject(err);
    }).catch((error) => {
      reject(error)
    })
  })
}


/**
 * author: 
 * description: put方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function put(url, params = {}) {
  params = myUtils.setNullStringToNull(params);
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * author: 
 * description: 删除方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function deleted(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function constructionHttpFunction(requestUrl, requestData, method) {
  let methods = method ? method : 'post';
  if (methods === 'get') {
    return get(requestUrl).then(res => res.data)
  }
  if (methods === 'post') {
    return post(requestUrl, requestData).then(res => res.data)
  }
  if (methods === 'put') {
    return put(requestUrl, requestData).then(res => res.data)
  }
  if (methods === 'delete') {
    return deleted(requestUrl, requestData).then(res => res.data)
  }
}
