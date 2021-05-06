'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('PopularLocation');
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      CREATE TABLE `PopularLocation` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `location` varchar(255) NOT NULL,
      `locationAddress` varchar(255) NOT NULL,
      `image` varchar(255) DEFAULT NULL,
      `isEnable` tinyint(1) NOT NULL DEFAULT '1',
      `createdAt` datetime NOT NULL,
      `updatedAt` datetime NOT NULL,
        PRIMARY KEY (`id`)    
    */

  return Promise.all([
    queryInterface.createTable('PopularLocation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      location: {
        type: Sequelize.STRING,
      },
      locationAddress: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      isEnable: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  ])
  }
};
