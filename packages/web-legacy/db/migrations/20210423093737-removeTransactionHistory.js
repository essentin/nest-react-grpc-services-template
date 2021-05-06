'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('TransactionHistory')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('TransactionHistory', {

        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        reservationId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        userId: {
          type: Sequelize.UUID,
          allowNull: false
        },

        payoutId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        payoutEmail: {
          type: Sequelize.STRING,
          allowNull: false
        },

        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },

        fees: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },

        currency: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        transactionId: {
          type: Sequelize.STRING,
        },

        paymentMethodId: {
          type: Sequelize.INTEGER
        }

      })
    ]);
  },
};
