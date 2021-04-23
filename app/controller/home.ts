import { Controller } from 'egg';

import { Post, Prefix } from 'egg-shell-decorators';


@Prefix('/home')
export default class HomeController extends Controller {

  @Post('/')
  public async index() {
    const { ctx } = this;
    ctx.body = `Hello ${ctx.helper.util.hello()}!`;
  }
}
