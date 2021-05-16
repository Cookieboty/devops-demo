/*
 * @Author: Cookie
 * @Date: 2020-07-29 14:00:36
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 16:20:46
 * @FilePath: /processSystem/config/plugin.ts
 * @Description:
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  helper: {
    enable: true,
    package: 'egg-helper',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};

export default plugin;
