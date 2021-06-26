/*
 * @Author: Cookie
 * @Date: 2019-07-17 14:04:15
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 15:49:49
 * @Description: 用户模块 Controller
 */

import { Post, Prefix, Get } from "egg-shell-decorators";
import BaseController from "./base";

@Prefix("user")
export default class UserController extends BaseController {

  /**
     * @author: Cookie
     * @description: 根据 Applications access_token
     */

  @Get("/getTokenByApp")
  public async getTokenByApplications({
    request: {
      query: { code },
    },
  }) {
    const { ctx, app } = this;
    // gitLab 获取 access_token
    const userToken = await ctx.service.user.getTokenByApplications({ code });

    // gitLab 获取用户信息
    const userInfo = await ctx.service.user.getUserInfo({
      access_token: userToken.access_token,
    });

    // 用户数据本地落库
    ctx.service.user.saveUser({
      userInfo,
    });

    // 将用户信息及 token 使用 jwt 注册
    const token = app.jwt.sign(
      {
        userToken,
        userInfo,
      },
      app.config.jwt.secret
    );

    ctx.set({ "Access-Control-Expose-Headers": "authorization" });
    ctx.set({ authorization: token }); // 设置 headers
    ctx.cookies.set('authorization', token, {
      maxAge: 1000 * 3600 * 24, // cookie存储一天 设置过期时间后关闭浏览器重新打开cookie还存在
      httpOnly: true, // 仅允许服务获取,不允许js获取
      domain: '.cookieboty.com' // 设置cookie跨域
    });
    ctx.redirect(`http://fe.cookieboty.com`);
  }

  /**
   * @author: Cookie
   * @description: 根据 gitLab 用户密码获取 access_token
   */
  @Post("/getUserToken")
  public async getUserToken({
    request: {
      body: { params },
    },
  }) {
    const { ctx, app } = this;
    const { username, password } = params;

    // gitLab 获取 access_token
    const userToken = await ctx.service.user.getUserToken({
      username,
      password,
    });

    // gitLab 获取用户信息
    const userInfo = await ctx.service.user.getUserInfo({
      access_token: userToken.access_token,
    });

    // 用户数据本地落库
    ctx.service.user.saveUser({
      userInfo,
    });

    // 将用户信息及 token 使用 jwt 注册
    const token = app.jwt.sign(
      {
        userToken,
        userInfo,
      },
      app.config.jwt.secret
    );

    ctx.set({ "Access-Control-Expose-Headers": "authorization" });
    ctx.set({ authorization: token }); // 设置headers
    this.success(userInfo);
  }

  /**
   * @author: Cookie
   * @description: 根据 gitLab 用户密码获取 access_token
   */
  @Get("/getUserInfo")
  public async getUserInfo({
    request: {
      body: { params },
    },
  }) {
    const { ctx } = this;
    const { access_token } = this.user;
    // gitLab 获取用户信息
    const userInfo = await ctx.service.user.getUserInfo({
      access_token,
    });

    this.success(userInfo);
  }
}
