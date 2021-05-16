/*
 * @Author: Cookie
 * @Date: 2020-07-29 23:30:02
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 15:37:25
 * @Description: 项目
 */
import { Service } from "egg";

export default class Project extends Service {
  /**
   * @author: Cookie
   * @description: 根据 gitLab api 获取项目 list，且数据落库
   */
  public async getProjectList({ pageSize = 100, pageNum = 1, access_token, userId }) {
    const { ctx } = this;
    const { projectList } = await ctx.helper.api.gitLab.project.getProjectByUser({
      pageSize,
      pageNum,
      access_token,
      userId
    });
    const selfProjectList: any = [];
    const opt: number[] = [];

    if (!projectList) return []

    projectList.forEach((project) => {
      if (project) {
        selfProjectList.push({
          projectSourceId: project.id,
          namespace: project.namespace.name,
          projectUrl: project.web_url,
          projectGitName: project.name,
          projectGitDesc: project.description,
          projectDesc: project.description,
          logo: project.logo,
          lastActivityAt: new Date(project.last_activity_at),
          nameWithNamespace: project.name_with_namespace,
        });
        opt.push(project.id);
      }
    });

    // 数据落库，批量更新
    if (selfProjectList.length > 0) {
      console.log(ctx.model.Project)
      await ctx.model.Project.bulkCreate(selfProjectList, {
        updateOnDuplicate: [
          "projectGitDesc",
          "namespace",
          "projectUrl",
          "projectGitName",
          "lastActivityAt",
          "logo",
          "nameWithNamespace",
        ],
      });
    }

    const local: any = await ctx.model.Project.findAll({
      where: {
        projectSourceId: opt,
      },
    });

    return local;
  }

  /**
   * @author: Cookie
   * @description: 查询单个项目详情
   */
  public async getProject({ projectId, access_token }) {
    const { ctx } = this;
    const self_project = await ctx.model.Project.findOne({
      where: {
        id: projectId
      },
      raw: true,
    });
    const project = await ctx.helper.api.gitLab.project.getProject({
      id: self_project.projectSourceId,
      access_token
    });
    return { ...self_project, ...project };
  }
}
