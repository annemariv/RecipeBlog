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