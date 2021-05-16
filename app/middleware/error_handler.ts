/*
 * @Author: Cookie
 * @Date: 2020-08-07 23:16:50
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-09 08:15:22
 * @Description:
 */
import HttpExceptions from "../exceptions/http_exceptions";

export default () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);

      let status = err.status || 500;
      let error: any = {};

      if (err instanceof HttpExceptions) {
        status = err.httpCode;
        error.requestUrl = `${ctx.method} : ${ctx.path}`;
        error.msg = err.msg;
        error.code = err.code;
        error.httpCode = err.httpCode;
      } else {
        // 未知异常，系统异常，线上不显示堆栈信息
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        error.code = 500;
        error.errsInfo =
          status === 500 && ctx.app.config.env === "prod"
            ? "Internal Server Error"
            : err.message;
      }
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = error;
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
