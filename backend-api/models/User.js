module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
        },
        EmailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PhoneNumber2FA: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        IsAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
    )
    console.log(User === sequelize.models.User)
    return User;
}



          