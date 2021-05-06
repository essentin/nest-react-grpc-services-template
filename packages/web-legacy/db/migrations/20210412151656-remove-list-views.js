'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ListViews');
  },

  down: (queryInterface, Sequelize) => {
    /*
      CREATE TABLE `ListViews` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `listId` int(11) NOT NULL,
      `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      `createdAt` datetime NOT NULL,
      `updatedAt` datetime NOT NULL,
      PRIMARY KEY (`id`,`userId`)
    */
    return Promise.all([
      queryInterface.createTable('ListViews', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        listId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
    ]);
  },
};
