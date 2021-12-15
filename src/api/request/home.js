/**
 * author: liuhui
 * description: 登录接口
 * date: 2019-12-09
 *
 */

const axios = require('../http');
module.exports = {
  name: '主模块',
  /**
   * 登录
   */
  loginSys: params => {
    return axios
      .post('cms-service/admin/adminUser/login', params)
      .then(res => res.data);
  },
  /**
   * @author: Dai
   * @description: 获取登录用户信息
   * @date: 2019/2/22 18:31
   */
  getLoginUserInfo() {
    return axios
      .get('cms-service/admin/adminUser/getLoginInfo')
      .then(res => res.data);
  },
  getVideoPay() {
    return axios
      .get('cms-service/admin/adminUser/getLoginInfo')
      .then(res => res.data);
  }
};
