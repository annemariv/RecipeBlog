//const {DataTypes} = require('sequelize');
//const { toDefaultValue } = require('sequelize/lib/utils');

module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define(
        'Recipe', {
            RecipeID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        Create_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }
    )
    console.log(Recipe === sequelize.models.Recipe)
    return Recipe;
}



          