import { Controller } from 'egg';
import { Post, Prefix, Get } from 'egg-shell-decorators';

@Prefix('user')
export default class UserController extends Controller {
  @Post('/getUserToken')
  public async getUserToken({
    request: {
      body: { params },
    },
  }) {
    const { ctx } = this;
    const { username, password } = params;

    // gitLab 获取 access_token
    const userToken = await ctx.service.user.getUserToken({
      username,
      password,
    });

    this.ctx.body = userToken;
  }

  @Get('/getTokenByApp')
  public async getTokenByApplications({
    request: {
      query: { code },
    },
  }) {
    const { ctx } = this;
    // gitLab 获取 access_token
    const userToken = await ctx.service.user.getTokenByApplications({ code });
    this.ctx.body = userToken;
  }

}
