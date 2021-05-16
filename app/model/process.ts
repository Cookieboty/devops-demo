/*
 * @Author: Cookie
 * @Date: 2019-08-06 10:07:16
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 10:53:38
 * @Description:
 */

export default app => {
  const { UUID, STRING, UUIDV4, INTEGER } = app.Sequelize;

  const Process = app.model.define(
    'process',
    {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      name: STRING(100),
      workflowTplId: {
        type: UUID,
        allowNull: false,
      },
      processStatus: {
        type: INTEGER,
        defaultValue: 0,
        primaryKey: true,
      },
      createdUser: STRING(100),
      updateUser: STRING(100),
      branchIds: {
        type: STRING(1000),
        set(val, name) {
          const vals = val && val.length > 0 ? val.join(',') : '';
          console.log('vals====>', vals);
          (this as any).setDataValue(name, vals);
        },
        get(val) {
          console.log('val====>', val);
          const value = (this as any).getDataValue(val);
          console.log('value====>', value);
          return value ? value.split(',') : [];
        },
      },
    },
    { freezeTableName: true },
  );

  return Process;
};
