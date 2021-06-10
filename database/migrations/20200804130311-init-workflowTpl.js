module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { UUID, DATE, STRING, UUIDV4 } = Sequelize;
    await queryInterface.createTable('workflowTpl', {
      id: {
        type: UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      name: STRING(30),
      workflow_ids: STRING(30),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
