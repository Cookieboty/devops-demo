/*
 * @Author: Cookie
 * @Date: 2019-07-17 14:04:15
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 20:19:22
 * @Description: 项目模块 Controller
 */

import { Post, Prefix, Get } from "egg-shell-decorators";
import BaseController from "./base";

@Prefix("branch")
export default class BranchController extends BaseController {
  /**
   * @author: Cookie
   * @description: 创建分支
   */
  @Post("/create")
  public async createBranch({
    request: {
      body: { params },
    },
  }) {
    const { ctx } = this;
    const { access_token } = this.user;
    const { name: userName } = this.user;
    const { projectSourceId, ref, branch } = params;
    const newBranch = await ctx.service.branch.createBranch({
      access_token,
      projectSourceId,
      ref,
      branch,
      userName,
    });
    this.success(newBranch);
  }

  /**
   * @author: Cookie
   * @description: 获取分支
   */
  @Get("/getList")
  public async getBranchList({ request: { query } }) {
    const { ctx, user } = this;
    const { access_token } = user;
    const { projectId } = query;
    const { projectSourceId } = await ctx.service.project.getProject({ projectId, access_token });

    const branchList = await ctx.service.branch.getBranchList({
      projectId,
      access_token,
      projectSourceId: projectSourceId,
    });
    this.success(branchList);
  }


}
