/*
 * @Author: Cookie
 * @Date: 2019-08-29 14:17:50
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 11:59:00
 * @Description: gitLab 分支模块 api
 */

import AJAX from "../../utils/http";

module.exports = (app) => {
  /**
   * @author: Cookie
   * @description: 获取分支列表
   */
  const getBranchList = async ({
    pageSize,
    pageNum,
    projectId,
    access_token,
  }) => {
    try {
      const { data, code } = await AJAX(app).methodV({
        url: `/projects/${projectId}/repository/branches`,
        method: "GET",
        query: {
          per_page: pageSize,
          page: pageNum,
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

  /**
   * @author: Cookie
   * @description: 获取单分支
   */
  const getBranch = async ({ projectId, branch: branchName }) => {
    const branch = await AJAX(app).methodV({
      url: `/projects/${projectId}/repository/branches/${branchName}`,
      method: "GET",
    });
    return branch;
  };

  /**
   * @author: Cookie
   * @description: 创建分支
   */
  const createBranch = async ({ ref, projectId, branch, access_token }) => {
    const { code, data } = await AJAX(app).methodV({
      url: `/projects/${projectId}/repository/branches`,
      params: {
        ref,
        branch,
      },
      query: { access_token },
      method: "POST",
    });
    return data;
  };

  const setProtectedBranch = async ({ branch }) => {
    const { projectId } = branch;
    const status = await AJAX(app).methodV({
      url: `/projects/${projectId}/protected_branches`,
      params: {
        name: "zeus/*",
        merge_access_level: 30,
        push_access_level: 0,
      },
      method: "POST",
    });
    return status;
  };

  const delProtectedBranch = async ({ branch }) => {
    const { projectId } = branch;
    const status = await AJAX(app).methodV({
      url: `/projects/${projectId}/protected_branches/zeus%2F*`,
      method: "DELETE",
    });
    return status;
  };

  const delBranch = async (projectId, branchGitName) => {
    const status = await AJAX(app).methodV({
      url: `/projects/${projectId}/repository/branches/${encodeURIComponent(
        branchGitName
      )}`,
      method: "DELETE",
    });
    return status;
  };
  return {
    getBranchList,
    createBranch,
    getBranch,
    setProtectedBranch,
    delProtectedBranch,
    delBranch,
  };
};
