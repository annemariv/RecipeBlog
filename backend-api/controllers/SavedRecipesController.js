const { db } = require('../db');
const Utilities = require('./Utilities.js');
const UUID = require('uuid');


exports.create = async (req, res) => {
    if (!req.body.Title || !req.body.Content) {
        return res.status(400).send({ error: "Missing title or content" });
    }

    if (!req.body.UserID || !req.body.RecipeID) {
        return res.status(400).send({ error: "User or recipe not found" });
    }

    let newSavedRecipe = {
        Title: req.body.Title,
        Content: req.body.Content,
        UserID: req.body.UserID,
        RecipeID: req.body.RecipeID
    }

    const createdRecipe = await db.savedRecipes.create(newSavedRecipe);
    res
    .location(`${Utilities.getBaseURL(req)}/savedrecipes/${createdRecipe.SavedRecipeID}`)
    .sendStatus(201);
}