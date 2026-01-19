const UsersController = require("../controllers/UsersController");
const SessionController = require("../controllers/SessionController");

module.exports = (app) => {
    app.route("/users")
        .get(UsersController.getAll)
        app.route("/users")
        .post(UsersController.create)
        
     app.route("/users/:UserID")
        .get(UsersController.getUserByID)
        .delete(UsersController.deleteUserByID)

    app.route("/auth/:LoginEmail")
        .get(UsersController.getByEmail)

    app.route("/sessions")
        .post(SessionController.newSession)

    app.route("/sessions/me")
        .get(SessionController.reauthenticate)
}