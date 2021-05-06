import DataType from 'sequelize';
import Model from '../sequelize';

const ActivityType = Model.define('ActivityType', {

    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataType.STRING,
        allowNull: false
    },

    isEnable: {
        type: DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },

    image: {
        type: DataType.INTEGER,
        allowNull: false
    }

});

export default ActivityType;
