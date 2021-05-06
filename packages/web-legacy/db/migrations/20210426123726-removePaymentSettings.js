'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('PaymentSettings')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('PaymentSettings', {

        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        paymentName: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        paymentStatus: {
          type: Sequelize.ENUM('true', 'false'),
          defaultValue: 'false',
        },

        paymentMode: {
          type: Sequelize.ENUM('live', 'sandbox'),
          defaultValue: 'sandbox',
        },

        email: {
          type: Sequelize.STRING,
          validate: { isEmail: true },
        },

        APIUserId: {
          type: Sequelize.STRING,
        },

        APIPassword: {
          type: Sequelize.STRING,
        },

        APISecret: {
          type: Sequelize.STRING,
        },

        AppId: {
          type: Sequelize.STRING,
        }

      })
    ]);
  }
};
