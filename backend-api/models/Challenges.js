//const {DataTypes} = require('sequelize');
//const { toDefaultValue } = require('sequelize/lib/utils');

module.exports = (sequelize, DataTypes) => {
    const Challenge = sequelize.define(
        'Challenge', {
            ChallengeID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        }
    }
    )
    console.log(Challenge === sequelize.models.Challenge)
    return Challenge;
}



          