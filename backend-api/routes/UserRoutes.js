const UsersController = require("../controllers/UsersController");

module.exports = (app) => {
    app.route("/users")
        .get(UsersController.getAll)
        app.route("/users")
        .post(UsersController.create)
}