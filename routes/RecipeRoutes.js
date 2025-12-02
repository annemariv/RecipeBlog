//all routes are added here
const RecipesController = require("../controllers/RecipesController");

//all modules are added here
module.exports = (app) => {
    app.route("/recipes")
    .get(RecipesController.getAll);

    app.route("/recipes/:RecipeID")
    .get(RecipesController.getByID);
}