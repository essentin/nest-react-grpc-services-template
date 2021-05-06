import DataType from 'sequelize';
import Model from '../sequelize';

const SpaceAvailabilitySession = Model.define('SpaceAvailabilitySession', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    spaceAvailabilityId: {
        type: DataType.INTEGER,
    },
    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },
    day: {
        type: DataType.TEXT,
    },
    startTime: {
        type: DataType.FLOAT,
    },
    endTime: {
        type: DataType.FLOAT,
    },
    isNextDay: {
        type: DataType.BOOLEAN,
        defaultValue: false
    }
});

export default SpaceAvailabilitySession;