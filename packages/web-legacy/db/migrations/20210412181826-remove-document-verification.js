'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DocumentVerification');
  },

  down: (queryInterface, Sequelize) => {
    /*
      ACREATE TABLE `DocumentVerification` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
      `fileName` varchar(255) DEFAULT NULL,
      `fileType` varchar(255) DEFAULT NULL,
      `documentStatus` enum('pending','approved') DEFAULT 'pending',
      `createdAt` datetime NOT NULL,
      `updatedAt` datetime NOT NULL,
      PRIMARY KEY (`id`)
    */

    return Promise.all([
      queryInterface.createTable('DocumentVerification', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fileName: Sequelize.STRING,
        fileType: Sequelize.STRING,
        documentStatus: {
          type: Sequelize.ENUM('pending', 'approved'),
          defaultValue: 'pending',
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
    ]);
  },
};
