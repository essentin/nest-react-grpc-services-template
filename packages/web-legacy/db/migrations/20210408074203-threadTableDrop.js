'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('ThreadItems'),
      queryInterface.dropTable('Threads'),
      queryInterface.dropTable('RequestBlockedDates')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('Threads', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        listId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        host: {
          type: Sequelize.STRING,
          allowNull: false
        },
        guest: {
          type: Sequelize.STRING,
          allowNull: false
        },
        isRead: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        messageUpdatedDate: {
          type: Sequelize.DATE,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),

      queryInterface.createTable('ThreadItems', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        threadId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        reservationId: {
          type: Sequelize.INTEGER,
        },
        sentBy: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
        },
        isRead: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        type: {
          type: Sequelize.ENUM('message', 'inquiry', 'preApproved', 'declined', 'approved', 'pending', 'cancelledByHost', 'cancelledByGuest', 'intantBooking', 'requestToBook', 'confirmed', 'expired', 'completed'),
          defaultValue: 'message',
        },
        startDate: {
          type: Sequelize.DATE,
        },
        endDate: {
          type: Sequelize.DATE,
        },
        personCapacity: {
          type: Sequelize.INTEGER,
        },
        activityType: {
          type: Sequelize.INTEGER,
        },
        startTime: {
          type: Sequelize.FLOAT
        },
        endTime: {
          type: Sequelize.FLOAT
        }
      }),

      queryInterface.createTable('RequestBlockedDates', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        listId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        threadItemsId: {
          type: Sequelize.INTEGER,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        startTime: {
          type: Sequelize.FLOAT
        },
        endTime: {
          type: Sequelize.FLOAT
        },
        isNextDay: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        totalHours: {
          type: Sequelize.FLOAT
        }
      })
    ])
  }
};
