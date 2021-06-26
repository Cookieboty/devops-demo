/*
 * @Author: Cookie
 * @Date: 2019-08-21 19:51:36
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 19:30:44
 * @Description:
 */


module.exports = app => {
  const { STRING, INTEGER, UUID, UUIDV4, TEXT } = app.Sequelize;

  const Branch = app.model.define(
    'branch',
    {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      projectSourceId: {
        type: STRING(30),
        primaryKey: true,
      },
      projectId: {
        type: UUID,
      },
      processId: {
        type: UUID,
      },
      branchName: STRING(30),
      branchGitName: { type: STRING(30), primaryKey: true },
      createdUser: STRING(50),
      remarks: STRING(1000),
      updateUser: STRING(100),
      branchStatus: {
        type: INTEGER,
        defaultValue: 0,
      },
      branchNextStatus: {
        type: INTEGER,
        defaultValue: 1,
      },
      commit: {
        type: TEXT('long'),
        primaryKey: true,
        set(val, name) {
          const vals = val ? JSON.stringify(val) : '';
          (this as any).setDataValue(name, vals);
        },
        get(val) {
          const value = (this as any).getDataValue(val);
          return value ? JSON.parse(value) : {};
        },
      },
    },
    { freezeTableName: true },
  );

  return Branch;
};
