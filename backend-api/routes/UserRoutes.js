const UsersController = require("../controllers/UsersController");

module.exports = (app) => {
    app.route("/users")
        .get(UsersController.getAll)
        app.route("/users")
        .post(UsersController.create)

     app.route("/users/:UserID")
        .get(UsersController.getUserByID)
        .delete(UsersController.deleteUserByID)
}