/*
 * @Author: Cookie
 * @Date: 2020-08-07 23:16:01
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-09 08:12:11
 * @Description:
 */

export default class HttpExceptions extends Error {
  code: number;
  msg: string;
  httpCode: number;

  constructor({ msg = "服务器异常", code = 1, httpCode = 400 }) {
    super();
    this.msg = msg;
    this.code = code;
    this.httpCode = httpCode;
  }
}
