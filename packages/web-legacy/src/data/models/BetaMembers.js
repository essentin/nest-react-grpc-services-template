import DataType from 'sequelize';
import Model from '../sequelize';

const BetaMembers = Model.define('BetaMembers', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    firstName: {
        type: DataType.STRING,
        allowNull: false
    },

    lastName: {
        type: DataType.STRING,
        allowNull: false
    },

    email: {
        type: DataType.STRING,
        allowNull: false
    }
});

export default BetaMembers;