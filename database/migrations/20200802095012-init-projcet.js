/*
 * @Author: Cookie
 * @Date: 2019-08-05 10:27:10
 * @LastEditors: Cookie
 * @LastEditTime: 2019-08-21 19:18:02
 * @Description:
 */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      DATE, STRING, INTEGER, UUID, UUIDV4,
    } = Sequelize;
    await queryInterface.createTable('project', {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      project_source: {
        type: INTEGER,
        defaultValue: 0,
        primaryKey: true,
      },
      project_source_id: {
        type: STRING(30),
        primaryKey: true,
      },
      created_at: DATE,
      updated_at: DATE,
      project_name: STRING(30),
      project_type: STRING(30),
      namespace: STRING(30),
      project_url: STRING(100),
      project_git_desc: STRING(200),
      project_desc: STRING(200),
      project_git_name: STRING(30),
    });
  },

  down: (queryInterface, Sequelize) => {
  },
};
