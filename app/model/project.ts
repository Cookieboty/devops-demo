/*
 * @Author: Cookie
 * @Date: 2019-08-19 10:26:57
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-11 21:31:24
 * @Description:
 */


module.exports = app => {
  const { STRING, INTEGER, UUID, UUIDV4, DATE } = app.Sequelize;

  const Project = app.model.define(
    'project',
    {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      projectSource: {
        type: INTEGER,
        defaultValue: 0,
        primaryKey: true,
      },
      projectSourceId: {
        type: STRING(30),
        primaryKey: true,
      },
      projectName: STRING(30),
      projectType: {
        type: STRING(1000),
        primaryKey: true,
        set(val, name) {
          const vals = val && val.length > 0 ? val.join(',') : '';
          (this as any).setDataValue(name, vals);
        },
        get(val) {
          const value = (this as any).getDataValue(val);
          return value ? value.split(',') : [];
        },
      },
      namespace: STRING(30),
      projectUrl: STRING(100),
      projectGitDesc: STRING(200),
      projectDesc: STRING(200),
      projectGitName: STRING(30),
      projectFeat: {
        type: INTEGER,
        defaultValue: 0,
      },
      projectBugfix: {
        type: INTEGER,
        defaultValue: 0,
      },
      projectRelease: {
        type: INTEGER,
        defaultValue: 0,
      },
      lastActivityAt: DATE,
      nameWithNamespace: STRING(100),
      logo: STRING(100),
    },
    {
      freezeTableName: true,
    },
  );
  return Project;
};
