//all routes are added here
const ChallengesController = require("../controllers/ChallengesController");

//all modules are added here
module.exports = (app) => {
    app.route("/challenges")
     .get(ChallengesController.getAll)
        .post(ChallengesController.create);

        
    app.route("/challenges/:ChallengeID")
      .get(ChallengesController.getByID)
      .delete(ChallengesController.deleteByID)
      .put(ChallengesController.modifyByID);

    }