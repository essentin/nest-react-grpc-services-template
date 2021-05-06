import DataType from 'sequelize';
import Model from '../sequelize';

const SpaceAvailability = Model.define('SpaceAvailability', {

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
        type: DataType.TEXT,
    },
    isOpen: {
        type: DataType.BOOLEAN,
        defaultValue: 1
    },
    isWholeDay: {
        type: DataType.BOOLEAN,
        defaultValue: 1
    }
});

export default SpaceAvailability;