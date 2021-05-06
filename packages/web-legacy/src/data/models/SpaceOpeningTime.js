import DataType from 'sequelize';
import Model from '../sequelize';

const SpaceOpeningTime = Model.define('SpaceOpeningTime', {
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
    day: {
        type: DataType.STRING,
    },
    startTime: {
        type: DataType.FLOAT,
    },
    endTime: {
        type: DataType.FLOAT,
    }
});

export default SpaceOpeningTime;