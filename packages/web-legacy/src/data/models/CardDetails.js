import DataType from 'sequelize';
import Model from '../sequelize';

const CardDetails = Model.define('CardDetails', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataType.UUID
    },

    customerId: {
        type: DataType.STRING,
    },

    paymentMethodId: {
        type: DataType.STRING,
    },

    last4Digits: {
        type: DataType.INTEGER,
    },

    default: {
        type: DataType.BOOLEAN,
    },

    isVerified: {
        type: DataType.BOOLEAN,
    },

    cardUserName: {
        type: DataType.STRING,
    },

    expiryDate: {
        type: DataType.STRING,
    },

    cardType: {
        type: DataType.STRING,
    },
       
});

export default CardDetails;