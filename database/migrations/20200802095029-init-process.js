/*
 * @Author: Cookie
 * @Date: 2020-08-05 16:29:50
 * @LastEditors: Cookie
 * @LastEditTime: 2021-05-16 16:19:18
 * @Description: 
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      DATE, STRING, INTEGER, UUID, UUIDV4, TEXT
    } = Sequelize;
    await queryInterface.createTable('process', {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      branch_ids: {
        type: STRING(200),
        primaryKey: true,
      },
      workflow_tpl_id: {
        type: UUID,
        allowNull: false,
      },
      process_status: {
        type: INTEGER,
        defaultValue: 0,
        primaryKey: true,
      },
      name: STRING(100),
      desc: TEXT('long'),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async (queryInterface, Sequelize) => { }
};
