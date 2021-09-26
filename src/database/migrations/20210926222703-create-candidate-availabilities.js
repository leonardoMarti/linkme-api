'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('candidate_availabilities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      candidate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'candidates',
          key: 'id',
        },
      },
      availability_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'availabilities',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('candidate_availabilities');
  },
};
