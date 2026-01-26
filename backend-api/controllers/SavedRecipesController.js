const { db } = require('../db');
const Utilities = require('./Utilities.js');

exports.create = async (req, res) => {
  try {
    const { UserID, RecipeID } = req.body;

    if (!UserID || !RecipeID) {
      return res.status(400).send({ error: "User or recipe not found" });
    }

    const existing = await db.savedRecipes.findOne({ where: { UserID, RecipeID } });
    if (existing) {
      return res.status(409).send({ error: "Recipe already saved by this user" });
    }

    const createdRecipe = await db.savedRecipes.create({ UserID, RecipeID });

    res
      .location(`${Utilities.getBaseURL(req)}/savedrecipes/${createdRecipe.SavedRecipeID}`)
      .status(201)
      .send({ SavedRecipeID: createdRecipe.SavedRecipeID });

  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};
