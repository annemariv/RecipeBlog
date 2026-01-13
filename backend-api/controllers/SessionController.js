const { db } = require('../db');
const Utilities = require('./Utilities.js');

exports.newSession = async (req, res) => {
    // 1️⃣ Check for missing parameters
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

        // 2️⃣ Look up user by email
        const userToProvideSessionFor = await db.users.findOne({
            where: { EmailAddress: LoginEmail }
        });

        if (!userToProvideSessionFor) {
            return res.status(404).send({ error: "User not found" });
        }

        // 3️⃣ Check password using Utilities.letMeIn
        const isCorrect = await Utilities.letMeIn(LoginPassword, userToProvideSessionFor.PasswordHASH);

        if (!isCorrect) {
            return res.status(401).send({ error: "Password mismatch" });
        }

        // 4️⃣ Set session
        req.session.UserID = userToProvideSessionFor.UserID;

        // 5️⃣ Send success response
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
