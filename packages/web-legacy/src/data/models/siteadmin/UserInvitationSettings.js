import DataType from 'sequelize';
import Model from '../../sequelize';

const UserMood = Model.define('UserInvitationSettings', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    maxInvites: {
        type: DataType.INTEGER,
        allowNull: false
    }
});

export default UserMood;