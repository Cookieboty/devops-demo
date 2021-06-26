/*
 * @Author: Cookie
 * @Date: 2020-07-29 14:00:36
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 20:52:12
 * @FilePath: /processSystem/app/router.ts
 * @Description:
 */
import { Application } from "egg";
import { EggShell } from "egg-shell-decorators";

export default (app: Application) => {
  const { router, controller, io } = app;

  EggShell(app);

  // socket.io
  io.of('/').route('io/server', io.controller.nsp.ping);
  io.of('/').route('creatJob', io.controller.nsp.creatJob);
};
