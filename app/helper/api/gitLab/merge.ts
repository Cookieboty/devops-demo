/*
 * @Author: Cookie
 * @Date: 2020-04-21 16:06:27
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-05 17:22:17
 * @FilePath: /FE-DEPLOY-SYSTEM/app/helper/api/gitLab/merge.ts
 * @Description: gitLab 合并模块 api
 */

import AJAX from "../../utils/http";

module.exports = (app) => {
  /**
   * @description: 获取合并项目列表
   */
  const getMergeList = async ({ params }) => {
    const { data } = await AJAX(app).methodV({
      url: "/merge_requests",
      params,
      method: "GET",
    });
    return JSON.parse(data);
  };

  /**
   * @description: 处理合并请求
   */
  const acceptMerge = async ({ projectId, mergeRequestId }) => {
    const { data, code } = await AJAX(app).methodV({
      url: `/projects/${projectId}/merge_requests/${mergeRequestId}/merge`,
      method: "PUT",
    });
    switch (code) {
      case 200: {
        return { data: JSON.parse(data) };
      }
      case 201: {
        return { data: JSON.parse(data) };
      }
      case 404: {
        return { msg: "无效合并请求，请去 gitLab 检查" };
      }
      case 405: {
        return { msg: "无效合并请求，请去 gitLab 检查" };
      }
      default:
        return { msg: data.message };
    }
  };

  /**
   * @description: 创建合并请求
   */
  const createMerge = async ({
    projectId,
    sourceBranch,
    targetBranch,
    title,
    description,
    assigneeId,
  }) => {
    try {
      const { data, code } = await AJAX(app).methodV({
        url: `/projects/${projectId}/merge_requests`,
        params: {
          source_branch: sourceBranch,
          target_branch: targetBranch,
          title,
          description,
          assignee_id: assigneeId,
        },
        method: "POST",
      });
      switch (code) {
        case 200: {
          return { data: JSON.parse(data) };
        }
        case 201: {
          return { data };
        }
        case 404: {
          return { msg: "无效合并请求，请去gitlab检查" };
        }
        case 405: {
          return { msg: "无效合并请求，请去gitlab检查" };
        }
        default:
          return { msg: data.message };
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * @description: 更新合并请求
   * @param {type}
   * @return:
   */
  const updateMerge = async ({ projectId, mergeRequestId, stateEvent }) => {
    const { data, code } = await AJAX(app).methodV({
      url: `/projects/${projectId}/merge_requests/${mergeRequestId}`,
      params: {
        state_event: stateEvent,
      },
      method: "PUT",
    });
    switch (code) {
      case 200: {
        return { data: JSON.parse(data) };
      }
      case 201: {
        return { data };
      }
      case 404: {
        return { msg: "无效更新请求，请去gitlab检查" };
      }
      case 405: {
        return { msg: "无效更新请求，请去gitlab检查" };
      }
      default:
        return { msg: data.message };
    }
  };

  return {
    getMergeList,
    acceptMerge,
    createMerge,
    updateMerge,
  };
};
