/*
 * @Author: Cookie
 * @Date: 2019-08-06 10:07:16
 * @LastEditors: Cookie
 * @LastEditTime: 2019-09-16 16:08:23
 * @Description:
 */

export default app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true },
    name: STRING(30),
    username: STRING(30),
    email: STRING(100),
    avatarUrl: STRING(200),
    webUrl: STRING(200),
  });

  return User;
};
