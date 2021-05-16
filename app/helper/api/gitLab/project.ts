/*
 * @Author: Cookie
 * @Date: 2020-07-29 21:23:05
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-05 17:23:13
 * @Description: gitLab 项目模块 api
 */
import AJAX from "../../utils/http";

module.exports = (app) => {
  /**
   * @author: Cookie
   * @description: 获取工程列表
   */
  const getProjectList = async ({ pageSize, pageNum, access_token }) => {
    const { data: projectList } = await AJAX(app).methodV({
      url: "/projects",
      method: "GET",
      query: {
        per_page: pageSize,
        page: pageNum,
        access_token
      },
    });
    return { projectList };
  };

  /**
   * @author: Cookie
   * @description: 获取用户所属工程
   */
  const getProjectByUser = async ({ pageSize, pageNum, access_token, userId }) => {
    const { data: projectList } = await AJAX(app).methodV({
      url: `/users/${userId}/projects`,
      method: "GET",
      query: {
        per_page: pageSize,
        page: pageNum,
        access_token
      },
    });
    return { projectList };
  };

  /**
  * @author: Cookie
  * @description: 获取工程
  */
  const getProject = async ({ id, access_token }) => {
    const project = await AJAX(app).methodV({
      url: `/projects/${id}`,
      method: "GET",
      query: { access_token }
    });
    return project;
  };

  /**
   * @author: Cookie
   * @description: 创建 gitLab 工程
   */
  const createProjects = async ({ gitParams }) => {
    const status = await AJAX(app).methodV({
      url: "/projects",
      method: "POST",
      params: {
        ...gitParams,
      },
    });
    return status;
  };

  /**
   * @author: Cookie
   * @description: 删除 gitLab 工程保护分支
   */
  const deleteProtectedBranches = async (projectId: number) => {
    const url = `/projects/${projectId}/protected_branches/master`;
    const status = await AJAX(app).methodV({
      url,
      method: "DELETE",
    });
    return status;
  };

  /**
   * @author: Cookie
   * @description: 设置 gitLab 工程保护分支
   */
  const protectedBranches = async (projectId: number) => {
    const url = `/projects/${projectId}/protected_branches`;
    const status = await AJAX(app).methodV({
      url,
      method: "POST",
      params: {
        name: "master",
        push_access_level: 0,
        merge_access_level: 40,
      },
    });
    return status;
  };

  return {
    getProjectList,
    getProject,
    getProjectByUser,
    createProjects,
    deleteProtectedBranches,
    protectedBranches,
  };
};
