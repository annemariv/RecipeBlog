const { db } = require('../db');
const Utilities = require('./Utilities.js');

exports.newSession = async (req, res) => {
    if (!req.body.LoginEmail || !req.body.LoginPassword) {
        let missingParams = "";
        if (!req.body.LoginEmail) missingParams += "No email provided. ";
        if (!req.body.LoginPassword) missingParams += "No password provided. ";
        return res.status(400).send({ 
            error: "Missing parameters for logging in", 
            details: missingParams 
        });
    }

    try {
        const LoginEmail = req.body.LoginEmail;
        const LoginPassword = req.body.LoginPassword;

        const userToProvideSessionFor = await db.users.findOne({
            where: { EmailAddress: LoginEmail }
        });

        if (!userToProvideSessionFor) {
            return res.status(404).send({ error: "User not found" });
        }

        const isCorrect = await Utilities.letMeIn(LoginPassword, userToProvideSessionFor.Password);

        if (!isCorrect) {
            return res.status(401).send({ error: "Password mismatch" });
        }

        req.session.UserID = userToProvideSessionFor.UserID;


        return res.status(200).send({
            UserID: userToProvideSessionFor.UserID,
            DisplayName: userToProvideSessionFor.DisplayName,
            EmailAddress: userToProvideSessionFor.EmailAddress,
            IsAdmin: userToProvideSessionFor.IsAdmin,
            message: "Login successful"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Server error" });
    }
};
exports.reauthenticate = async (req, res) => {
    if (!req.session.UserID) {
        return res.status(401).send({ error: "Session expired, please log in again." })
    }
    var user = await db.users.findByPk(req.session.UserID)
    if (!user)
    {
        return res.status(401).send({ error: "Logged in user not found, please log in again." })
    }
    return res.status(200).send({
        UserID: user.UserID,
        DisplayName: user.DisplayName,
        EmailAddress: user.EmailAddress,
        IsAdmin: user.IsAdmin,
    });
}
