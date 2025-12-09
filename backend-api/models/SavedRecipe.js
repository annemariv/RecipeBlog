
module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define(
        'SavedRecipe', {
            ListID: {
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
            }
        }
    )
    console.log(SavedRecipe === sequelize.models.SavedRecipe)
    return SavedRecipe;
}