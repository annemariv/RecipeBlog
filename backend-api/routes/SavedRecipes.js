const SavedRecipesController = require("../controllers/SavedRecipesController");

module.exports = (app) => {
    app.route("/savedrecipes")
    .post(SavedRecipesController.create)
    .get(SavedRecipesController.getAll) 

     app.route("/savedrecipes/:SavedRecipeID")
    .delete(SavedRecipesController.delete)
}