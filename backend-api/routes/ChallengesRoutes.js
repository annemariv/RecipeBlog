//all routes are added here
const ChallengesController = require("../controllers/ChallengesController");

//all modules are added here
module.exports = (app) => {
    app.route("/challenges")
     .get(ChallengesController.getAll)

        
    app.route("/challenges/:ChallengeID")
      .get(ChallengesController.getByID)
        

    }