/*
 * @Author: Cookie
 * @Date: 2020-08-05 16:28:21
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 20:00:37
 * @Description: 构建
 */
import { Service } from "egg";

export default class Build extends Service {
  /**
   * @author: Cookie
   * @description: 构建项目
   */
  public async buildProject({
    type = "h5",
    projectName,
    projectVersion,
    projectGitPath,
    branchName,
    buildPath,
    cache = false,
  }) {
    const { ctx } = this;
    const callBack = await ctx.helper.api.jenkins.index.buildJenkins({
      type,
      job: "fe-base",
      params: {
        PROJECT_NAME: projectName,
        PROJECT_VERSION: projectVersion,
        PROJECT_GIT_PATH: projectGitPath,
        BRANCH_NAME: branchName,
        BUILD_PATH: buildPath,
        CACHE: cache,
      },
    });
    return callBack;
  }
}
