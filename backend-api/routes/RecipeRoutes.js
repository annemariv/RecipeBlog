const RecipesController = require("../controllers/RecipesController");

const { authenticate } = require("../middleware/auth");
const { requireAdmin } = require("../middleware/admin");

module.exports = (app) => {
    app.route("/recipes")
        .get(RecipesController.getAll) // public
        .post(authenticate, requireAdmin, RecipesController.create); // admin only

    app.route("/recipes/:RecipeID")
        .get(RecipesController.getByID) // public
        .delete(authenticate, requireAdmin, RecipesController.deleteByID) // admin only
        .put(authenticate, requireAdmin, RecipesController.modifyByID); // admin only
};