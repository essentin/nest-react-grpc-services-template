import DataType from 'sequelize';
import Model from '../sequelize';

const UserInvitation = Model.define('UserInvitation', {

    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataType.STRING,
        allowNull: false
    },

    email: {
        type: DataType.STRING,
        allowNull: false
    },

    status: {
        type: DataType.ENUM('invited', 'joined', 'cancelled'),
        defaultValue: 'invited'
    },

    inviteCode: {
        type: DataType.STRING,
        allowNull: false
    },

    invitedAt: {
        type: DataType.DATE
    },

    registeredAt: {
        type: DataType.DATE
    },

    cancelledAt: {
        type: DataType.DATE
    },

    registeredEmail: {
        type: DataType.STRING
    },

    isUsed: {
        type: DataType.STRING,
        defaultValue: false
    }

});

export default UserInvitation;