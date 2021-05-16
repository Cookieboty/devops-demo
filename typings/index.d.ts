/*
 * @Author: Cookie
 * @Date: 2020-07-30 09:58:22
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 11:57:05
 * @FilePath: /processSystem/typings/index.d.ts
 * @Description: 重写
 */

import "egg";

declare module "egg" {
  interface Application { }
  interface CustomController {
    nsp: any;
  }

  interface EggSocketNameSpace {
    emit: any
  }
}
