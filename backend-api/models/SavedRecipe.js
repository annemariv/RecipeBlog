module.exports = (sequelize, DataTypes) => {
  const SavedRecipe = sequelize.define('SavedRecipe', {
    SavedRecipeID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    RecipeID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Recipe', key: 'RecipeID' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    UserID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'User', key: 'UserID' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  });

  return SavedRecipe;
};
