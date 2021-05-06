'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recommend');
  },

  down: (queryInterface, Sequelize) => {
    /*
      CREATE TABLE `Recommend` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `listId` int(11) NOT NULL,
        `createdAt` datetime NOT NULL,
        `updatedAt` datetime NOT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    */
    return Promise.all([
      queryInterface.createTable('Recommend', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        listId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
    ]);
  },
};
