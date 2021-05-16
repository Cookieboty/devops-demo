/*
 * @Author: Cookie
 * @Date: 2019-08-06 10:07:16
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 10:53:46
 * @Description:
 */

export default app => {
  const { UUID, STRING, UUIDV4, INTEGER } = app.Sequelize;

  const TestRecord = app.model.define(
    'testRecord',
    {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: STRING(30),
      desc: STRING(200),
      submitUserId: STRING(300),
      testUserId: {
        type: STRING(300),
        set(val, name) {
          const vals = val && val.length > 0 ? val.join(',') : '';
          console.log('vals====>', vals);
          (this as any).setDataValue(name, vals);
        },
        get(val) {
          const value = (this as any).getDataValue(val);
          return value ? value.split(',') : [];
        },
      },
      processId: {
        type: UUID,
      },
      testStatus: {
        type: INTEGER,
      },
      branchIds: {
        type: STRING(1000),
        set(val, name) {
          const vals = val && val.length > 0 ? val.join(',') : '';
          (this as any).setDataValue(name, vals);
        },
        get(val) {
          const value = (this as any).getDataValue(val);
          return value ? value.split(',') : [];
        },
      },
    },
    { freezeTableName: true },
  );

  return TestRecord;
};
