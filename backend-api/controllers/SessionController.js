const {db} = require('./db');
const Utilities = rquire('./Utilities.js');

exports.newSession =
async (req, res) => {
    if (!req.body.LoginEmail || !req.body.LoginPassword) {
        const missingParams = "";
        if (!req.body.LoginEmail) {
            missingParams += "No email provided";            
        }
        if (!req.body.LoginPassword) {
            missingParams += "No password provided";
        }
        return res.status(400).json({error: "Missing parameters for logging in", details: missingParams});
    }
    const userToProvideSessionFor = await db.users.getByEmail(req.body.LoginEmail); //not implemented yet
}