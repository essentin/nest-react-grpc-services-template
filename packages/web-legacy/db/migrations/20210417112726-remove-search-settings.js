'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SearchSettings');
  },

  down: (queryInterface, Sequelize) => {
    /*
      CREATE TABLE `SearchSettings` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `minPrice` float NOT NULL,
        `maxPrice` float NOT NULL,
        `PriceRangecurrency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `createdAt` datetime NOT NULL,
        `updatedAt` datetime NOT NULL,
        PRIMARY KEY (`id`)
    */

    return Promise.all([
      queryInterface.createTable('SearchSettings', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        minPrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        maxPrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        PriceRangecurrency: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
    ]);
  },
};
