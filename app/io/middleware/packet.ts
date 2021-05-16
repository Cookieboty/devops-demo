/*
 * @Author: Cookie
 * @Date: 2020-08-07 14:52:29
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-09 08:31:22
 * @FilePath: /processSystem/app/io/middleware/packet.ts
 * @Description: 消息预处理
 */

export default (app) => {
  return async (ctx, next) => {
    ctx.socket.emit("res", "packet received!");
    console.log("packet:", ctx.packet);
    await next();
  };
};
