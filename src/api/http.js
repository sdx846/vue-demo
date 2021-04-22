/**
 * author: liuhui
 * description: 封装axios
 * date: 2019-12-09
 */
import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
// import Store from '../vuex/store';
// import myUtils from '../util/customFunction';

export let baseURL;
export let NODE_ENV;
export let domain;

NODE_ENV = 'easypark';

// domain = 'http://' + window.location.host + '/';
// domain='https://test.easy-parking.cn/';
domain = 'http://127.0.0.1:8061/';

baseURL = domain + NODE_ENV + '/';
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 30000; //响应时间

/**
 * author:
 * description： axios拦截所有的请求，为请求加上一个token
 */
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['api-version'] = '1.0';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRMaXN0IjpbIjJjOTJlMmY1NjRlMTU1NjEwMTY1MTMzMjJlYWMwMDAxIiwiMmM5MmUyZjU2NGUxNTU2MTAxNjUxMzMyMmVhYzAwMDEiXSwibG9naW5OYW1lIjoiMTM1MDgxNjI3NzIiLCJpc3MiOiJ3d3cuZWFzeS1wYXJraW5nLmNuIiwiZXhwIjoxNjE1NDAyODAwLCJ1c2VyTmFtZSI6ImFkbWluIiwiaWF0IjoxNjE1MzM4MDY4LCJ1c2VySWQiOiI0MDI4ODE4MzVkZDNmOGM0MDE1ZGQzZmJiNDNkMDAwMiIsImp0aSI6ImVlNTc5MzdjMzM4MTRjNzBhZWFhOGQwOGNkOGMwY2JiIn0.2hbrFR9sBKVZn4gy48FdNiPPSEgZ3uNMBI3DYfVKkCg';
    if (token) {
      config.headers.Authorization = token;
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
      Message.error(response.data.desc);
    }
    return response;
  },
  error => {
    console.error('响应错误', error.response);
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
          Message({
            message: error.response.data.message || '服务器内部错误',
            type: 'error'
          });
          break;
        default:
          Message({ message: error.response.data.desc, type: 'error' });
          break;
      }
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

/**
 * author:
 * description: axios get方法封装
 * @param url 路径
 * @param params 参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
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
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
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
    axios
      .put(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
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
    axios
      .delete(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 使用axios组件手动上传文件
export function uploadFile(url, params) {
  let formData = new FormData();
  Object.entries(params).forEach(item => {
    formData.append(item[0], item[1]);
  });
  return axios({
    url,
    method: 'post',
    params,
    data: formData,
    responseType: 'text'
  });

  // this.request({
  //   url,
  //   data: formData,
  //   method: 'post',
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // });
}

// 获取blob格式的数据
export function getBlob(url, params, method) {
  return axios({
    url,
    method,
    params,
    data: params,
    responseType: 'blob'
  });
}

// 导出电子表格方法，封装默认参数为 1页5000条
export function exportFile(url, params) {
  // 如params对象不包含 exportPage ，则默认为导出五千条
  let { exportPage } = params;
  let initialExportPage = exportPage || { pageNo: 1, pageSize: 5000 };
  let data = Object.assign({}, { ...params, ...initialExportPage });
  return axios({
    url,
    method: 'post',
    data,
    responseType: 'blob'
  });
}
export function constructionHttpFunction(requestUrl, requestData, method) {
  let methods = method ? method : 'post';
  if (methods === 'get') {
    return get(requestUrl).then(res => res.data);
  }
  if (methods === 'post') {
    return post(requestUrl, requestData).then(res => res.data);
  }
  if (methods === 'put') {
    return put(requestUrl, requestData).then(res => res.data);
  }
  if (methods === 'delete') {
    return deleted(requestUrl, requestData).then(res => res.data);
  }
}
