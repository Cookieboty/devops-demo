/*
 * @Author: Cookie
 * @Date: 2020-08-07 14:53:43
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-09 08:31:39
 * @FilePath: /processSystem/app/io/controller/default.ts
 * @Description:
 */

import { Controller } from "egg";

export default class DefaultController extends Controller {
  async ping() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit("res", `Hi! I've got your message: ${message}`);
  }
}
