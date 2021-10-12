'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vacancy_personalities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      vacancy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vacancies',
          key: 'id',
        },
      },
      personality_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'personalities',
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
    await queryInterface.dropTable('vacancy_personalities');
  },
};
