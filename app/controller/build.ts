/*
 * @Author: Cookie
 * @Date: 2019-07-17 14:04:15
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-19 20:27:04
 * @Description: 构建 Controller
 */

import { Post, Prefix, Get } from "egg-shell-decorators";
import BaseController from "./base";

@Prefix("build")
export default class BuildController extends BaseController {
  /**
   * @author: Cookie
   * @description: 创建构建任务
   */
  @Post("/creatJob")
  public async creatJob({
    request: {
      body: { params },
    },
  }) {
    const { ctx } = this;
    const { access_token } = this.user;

    const {
      projectId,
      branchName,
      projectVersion,
      buildPath,
      type,
      cache,
    } = params;

    const project = await ctx.service.project.getProject({ projectId, access_token });
    let projectGitPath = project.projectUrl.replace(
      "http://",
      `https://oauth2:${access_token}@`
    );

    const callBack = await ctx.service.build.buildProject({
      type,
      projectName: project.projectGitName,
      projectVersion,
      projectGitPath: `${projectGitPath}.git`,
      branchName,
      buildPath,
      cache,
    });
    this.success(callBack);
  }
}
