const { db } = require('../db');
const { gimmePassword } = require('./Utilities');

exports.getAll = async (req, res) => {
    const users = await db.users.findAll();
    res.status(200)
    .send(users.map(({UserID, UserName, IsAdmin}) => {return{UserID, UserName, IsAdmin}}));
};

exports.create = async (req, res) => {
    const missing = [];

    if (!req.body.UserName) missing.push("UserName");
    if (!req.body.EmailAddress) missing.push("EmailAddress");
    if (!req.body.Password) missing.push("Password");

    if (missing.length > 0) {
        return res.status(400).send({
            error: `Missing required fields: ${missing.join(", ")}`
        });
    }

    try {
        const newUser = {
            UserName: req.body.UserName,
            EmailAddress: req.body.EmailAddress,
            Password: await gimmePassword(req.body.Password),
            PhoneNumber2FA: req.body.PhoneNumber2FA || null,
            IsAdmin: req.body.IsAdmin === true || false
        };

        const resultingUser = await db.users.create(newUser);

        return res
            .location(`/users/${resultingUser.UserID}`)
            .sendStatus(201);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};


exports.getByEmail = async (req, res) => {
    const user = await getUser(req, res, "Email");
    if (!user) return;
    return res.status(200).send(user);
};

const getUser = async (req, res, gtype) => {
    try {
        if (gtype === "ID") {
            const id = req.params.UserID;
            if (!id) return res.status(400).send({ error: "UserID is required" });

            const user = await db.users.findByPk(id);
            if (!user) return res.status(404).send({ error: "User not found" });

            return user;
        }

        if (gtype === "Email") {
            const email = req.params.LoginEmail;
            if (!email) return res.status(400).send({ error: "Email is required" });

            const user = await db.users.findOne({
                where: { EmailAddress: email }
            });

            if (!user) return res.status(404).send({ error: "User not found" });

            return user;
        }

        return res.status(400).send({ error: "Invalid lookup type" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Server error" });
    }
};


exports.getUserByID = 
async (req, res) => {
    const user = await getUser(req, res);
    if (!user) {return res.status(404).send({error: 'User not found'});}
    return res.status(200).send(user);
}

exports.deleteUserByID = 
async (req, res) => {
    const userToBeDeleted = await getUser(req, res);
    if (!userToBeDeleted) {return;}
    await userToBeDeleted.destroy();
    res.status(204).send({error:"No Content"});
}