import DataType from 'sequelize';
import Model from '../sequelize';

const SpacePricing = Model.define('SpacePricing', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },
    activityType: {
        type: DataType.INTEGER,
    },
    basePrice: {
        type: DataType.FLOAT,
        defaultValue: 0
    },
    minHour: {
        type: DataType.FLOAT,
        defaultValue: 0
    },
    discount: {
        type: DataType.FLOAT,
        defaultValue: 0
    },
    isCleaningIncluded: {
        type: DataType.BOOLEAN,
        defaultValue: 1
    },
    cleaningFee: {
        type: DataType.FLOAT,
        defaultValue: 0
    },
    maxGuest: {
        type: DataType.INTEGER,
    },
    currency: {
        type: DataType.TEXT,
    }
});

export default SpacePricing;