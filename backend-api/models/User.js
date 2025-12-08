module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserType: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
    )
    console.log(User === sequelize.models.User)
    return User;
}



          