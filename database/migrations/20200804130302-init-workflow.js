module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('workflow', {
      id: { type: INTEGER, primaryKey: true, },
      name: STRING(30),
      workflow_name: STRING(30),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
