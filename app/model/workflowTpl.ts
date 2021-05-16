/*
 * @Author: Cookie
 * @Date: 2019-08-06 10:07:16
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 10:53:59
 * @Description:
 */

export default app => {
  const { UUID, STRING, UUIDV4 } = app.Sequelize;

  const WorkflowTpl = app.model.define(
    'workflowTpl',
    {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: STRING(30),
      workflowIds: {
        type: STRING(30),
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

  return WorkflowTpl;
};
