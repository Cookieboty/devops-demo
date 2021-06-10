/*
 * @Author: Cookie
 * @Date: 2020-08-16 09:46:20
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-16 10:31:31
 * @Description: 
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUIDV4, UUID } = Sequelize;
    await queryInterface.createTable('testRecord', {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: STRING(30),
      desc: STRING(200),
      submit_user_id: STRING(300),
      test_user_id: STRING(300),
      branch_ids: {
        type: STRING(1000),
      },
      test_status: {
        type: INTEGER,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
