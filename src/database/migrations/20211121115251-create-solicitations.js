'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('solicitations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      vacancy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vacancies',
          key: 'id',
        },
      },
      sent_by: {
        type: Sequelize.ENUM('company', 'trainee'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'accept', 'reject'),
        allowNull: false,
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
    await queryInterface.dropTable('solicitations');
  },
};
