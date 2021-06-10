/*
 * @Author: Cookie
 * @Date: 2020-08-15 21:58:41
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-16 00:21:39
 * @Description: 
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const {
      DATE, STRING, INTEGER, UUID, UUIDV4
    } = Sequelize;
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('process', 'created_user', {
          type: STRING(100)
        }, { transaction: t }),
        queryInterface.addColumn('process', 'update_user', {
          type: STRING(100)
        }, { transaction: t }),
      ]);
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
