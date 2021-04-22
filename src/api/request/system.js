/**
 * author: liuhui
 * description: 系统模块
 * date: 2019-12-09
 *
 */

const axios = require('../http');
module.exports = {
  name: '系统模块',
  exportFile: params => {
    return axios
      .exportFile('park-info-service/admin/monthCard/importTemplate', params)
      .then(res => res.data);
  },
  uploadFile: params => {
    return axios
      .uploadFile('park-info-service/admin/monthCard/importData', params)
      .then(res => res.data);
  },
};
