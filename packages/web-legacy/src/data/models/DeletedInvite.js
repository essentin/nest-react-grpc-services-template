import DataType from 'sequelize';
import Model from '../sequelize';

const DeletedInvite = Model.define('DeletedInvite', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataType.STRING
    },
    email: {
        type: DataType.STRING
    },
    firstName: {
        type: DataType.STRING
    },
    inviteStatus: {
        type: DataType.STRING
    },
    registeredEmail: {
        type: DataType.STRING
    }
});

export default DeletedInvite;