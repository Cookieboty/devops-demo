/*
 * @Author: Cookie
 * @Date: 2020-08-07 14:51:09
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 20:14:34
 * @FilePath: /processSystem/app/io/middleware/connection.ts
 * @Description: socket.io 鉴权
 */

export default (app) => {
  return async (ctx, next) => {
    ctx.socket.emit("res", "connected!");
    await next();

    // execute when disconnect.
    console.log("disconnection!");
  };
};
