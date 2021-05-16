/*
 * @Author: Cookie
 * @Date: 2019-08-29 14:17:50
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-22 19:28:51
 * @Description: gitLab 分支模块 api
 */

import AJAX from "../../utils/http";

module.exports = (app) => {
  /**
   * @author: Cookie
   * @description: 获取分支列表
   */
  const getDeployTokens = async ({ projectId, access_token }) => {
    try {
      const { data, code } = await AJAX(app).methodV({
        url: `/projects/${projectId}/deploy_tokens`,
        method: "GET",
        query: {
          access_token,
        },
      });
      switch (code) {
        case 200: {
          return data;
        }
        default: {
          return { msg: data };
        }
      }
    } catch (e) {
      return { msg: e };
    }
  };

  return {
    getDeployTokens,
  };
};
