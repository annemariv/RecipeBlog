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

exports.getAll = async (req, res) => {
  const UserID = req.session?.UserID;

  if (!UserID) {
    return res.status(401).send({ error: "Unauthorized. Please log in." });
  }

  const saved = await db.savedRecipes.findAll({
    where: { UserID },
    include: {
      model: db.recipes,
      attributes: ['RecipeID', 'Title', 'Image']
    }
  });

  res.status(200).send(saved.map(item => ({
    SavedRecipeID: item.SavedRecipeID,
    RecipeID: item.RecipeID,
    Title: item.Recipe?.Title,
    Image: item.Recipe?.Image
  })));
};


exports.delete = async (req, res) => {
  const UserID = req.session?.UserID;
  const { SavedRecipeID } = req.params;

  if (!UserID) return res.status(401).send({ error: "Unauthorized. Please log in." });
  if (!SavedRecipeID) return res.status(400).send({ error: "SavedRecipeID is required" });

  const savedRecipe = await db.savedRecipes.findOne({
    where: { SavedRecipeID, UserID }
  });

  if (!savedRecipe) return res.status(404).send({ error: "Saved recipe not found" });

  await savedRecipe.destroy();

  res.status(200).send({ message: "Recipe removed from saved list" });
};

