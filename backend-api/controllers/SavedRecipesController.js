const {db} = require('../db.js');
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
        SavedRecipeID: UUID.v7(),
        Title: req.body.Title,
        Content: req.body.Content,
        UserID: req.body.UserID,
        RecipeID: req.body.RecipeID
    }

    const savedRecipe = await db.SavedRecipe.create(newSavedRecipe);
    res
    .location(`${Utilities.getBaseURL(req)}/savedrecipes/${savedRecipe.SavedRecipeID}`)
    .sendStatus(201);
}