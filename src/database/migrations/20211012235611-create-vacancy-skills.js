'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vacancy_skills', {
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
      skill_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'skills',
          key: 'id',
        },
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('vacancy_skills');
  },
};
