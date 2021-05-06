'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Payout')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('Payout', {

        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        methodId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        userId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          allowNull: false
        },

        payEmail: {
          type: Sequelize.STRING,
          allowNull: false
        },

        address1: {
          type: Sequelize.TEXT,
        },

        address2: {
          type: Sequelize.TEXT,
        },

        city: {
          type: Sequelize.STRING,
          allowNull: false
        },

        zipcode: {
          type: Sequelize.STRING,
          allowNull: false
        },

        state: {
          type: Sequelize.STRING,
          allowNull: false
        },

        country: {
          type: Sequelize.STRING,
          allowNull: false
        },

        currency: {
          type: Sequelize.STRING,
          allowNull: false
        },

        default: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },

        last4Digits: {
          type: Sequelize.INTEGER,
          allowNull: true
        },

        isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,

      })
    ]);
  },
};
