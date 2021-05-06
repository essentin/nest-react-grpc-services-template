import DataType from 'sequelize';
import Model from '../sequelize';

const Invites = Model.define('Invites', {

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
        type: DataType.STRING,
        unique: true
    },
    firstName: {
        type: DataType.STRING
    },
    inviteStatus: {
        type: DataType.ENUM('invited', 'pending', 'completed'),
        defaultValue: 'invited',
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
    registeredEmail: {
        type: DataType.STRING
    }
});

export default Invites;