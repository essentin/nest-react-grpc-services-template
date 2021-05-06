import DataType from 'sequelize';
import Model from '../sequelize';

const SuggestedWorkplace = Model.define('SuggestedWorkplace', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataType.STRING
    },

    placeName: {
        type: DataType.STRING,
        allowNull: false
    },

    city: {
        type: DataType.STRING
    }

});

export default SuggestedWorkplace;