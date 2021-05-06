import DataType from 'sequelize';
import Model from '../sequelize';

const ReservationBlockedDates = Model.define('ReservationBlockedDates', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },


  reservationId: {
    type: DataType.INTEGER,
  },

  date: {
    type: DataType.DATE,
    allowNull: false,
  },

  startTime: {
    type: DataType.FLOAT
  },

  endTime: {
    type: DataType.FLOAT
  },

  isNextDay: {
    type: DataType.BOOLEAN,
    defaultValue: false
  },

  totalHours: {
    type: DataType.FLOAT
  },

  isCancel: {
    type: DataType.BOOLEAN,
    defaultValue: false
  },

});

export default ReservationBlockedDates;
