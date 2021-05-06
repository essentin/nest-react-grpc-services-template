'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('ImageBanner'),
      queryInterface.dropTable('Banner')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('ImageBanner', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        },
        buttonLabel: {
          type: Sequelize.STRING,
          allowNull: false
        },
        image: {
          type: Sequelize.STRING,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
      queryInterface.createTable('Banner', {

        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        title: {
          type: Sequelize.STRING,
          allowNull: false
        },

        content: {
          type: Sequelize.STRING,
          allowNull: false
        },

        isEnable: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    ]);
  },
};
