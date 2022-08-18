'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'team_name',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
