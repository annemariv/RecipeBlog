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