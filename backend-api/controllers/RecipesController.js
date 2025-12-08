const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('uuid');


exports.getAll = 
async (req, res) => {
    const recipes = await db.recipes.findAll();
    console.log("getAll:"+ recipes)
    res
    .status(200)
    .send(recipes.map(({RecipeID,Title}) => {return {RecipeID,Title}}));
}

exports.getByID = 
async (req, res) => {
    const recipe = await getRecipe(req, res);
    if (!recipe) {return res.status(404).send({error: 'Recipe not found'});}
    return res.status(200).send(recipe);
}

exports.create = async (req, res) => {
    if (!req.body.Title || !req.body.Content) {
        return res.status(400).send({error: 'Title and content are required.'});
    }

    const newRecipe = {
        Title: req.body.Title,
        Content: req.body.Content,
        Image: req.body.Image || null,
    }

    const createdRecipe = await db.recipes.create(newRecipe);
    return res.location(`${Utilities.getBaseURL(req)}/recipes/${createdRecipe.RecipeID}`).sendStatus(201);
}

exports.deleteByID = 
async (req, res) => {
const recipeToBeDeleted = await getRecipe(req, res);
if (!recipeToBeDeleted) {return;}
await recipeToBeDeleted.destroy();
res.status(204).send({error:"No Content"});
}

exports.modifyByID =
async (req, res) => {
    const recipeToBeChanged = await getRecipe(req, res);
    if (!recipeToBeChanged) {
        return;
    }
    if (
        !req.body.Title ||
        !req.body.Content
    ) {
        return res.status(400).send({error: 'Title and content are required.'});
    }
    recipeToBeChanged.Title = req.body.Title;
    recipeToBeChanged.Content = req.body.Content;
    recipeToBeChanged.Image = req.body.Image || null;

    await recipeToBeChanged.save();
    return res
        .location(`${Utilities.getBaseURL(req)}/recipes/${recipeToBeChanged.RecipeID}`).sendStatus(200)
        .send(recipeToBeChanged
    );
}



const getRecipe = 
async (req, res) => {
    const idNumber = req.params.RecipeID;
    
    // if (UUID.validate(idNumber) !== true) {
    //     res.status(400).send({error: `Entered id is not valid ${idNumber}`})
    //     return null;
    // }

    const recipe = await db.recipes.findByPk(idNumber);
    if(!recipe) {
        res.status(404).send({error: `Recipe with id ${idNumber} was not found`})
        return null;
    }
   
    return recipe;
}