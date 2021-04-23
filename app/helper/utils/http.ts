/*
 * @Author: Cookie
 * @Date: 2019-07-17 14:59:18
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-22 19:29:25
 * @Description: request 模块
 */
import { GIT_URL } from '../../config/default.config';

const qs = require('qs');

export default app => {
  return {
    async post(url, params = {}, query = {}) {
      const sendUrl = `${GIT_URL}${url}?${qs.stringify(query)}`;
      try {
        const { data, code } = await app.curl(sendUrl, {
          dataType: 'json',
          method: 'POST',
          data: params,
        });
        return { data, code };
      } catch (error) {
        return error;
      }
    },
    async methodV({ url, method, params = {}, query = {} }) {
      const sendUrl = `${GIT_URL}/api/v4${url}?${qs.stringify(query)}`;
      try {
        const res = await app.curl(sendUrl, {
          dataType: 'json',
          method,
          data: params,
        });
        const { data, status: code } = res;
        return { data, code };
      } catch (error) {
        return error;
      }
    },
  };
};
