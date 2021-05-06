import DataType from 'sequelize';
import Model from '../sequelize';

const UserMood = Model.define('UserMood', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },
    moodsId: {
        type: DataType.INTEGER,
        allowNull: false
    }
});

export default UserMood;
