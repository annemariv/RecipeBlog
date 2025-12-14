const { db } = require('../db');
const { gimmePassword } = require('./Utilities');
const Utilities = require('./Utilities');

exports.getAll = async (req, res) => {
    const users = await db.users.findAll();
    res.status(200).send(users);
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

const getUser = 
async (req, res) => {
    const idNumber = req.params.UserID;
    const user = await db.users.findByPk(idNumber);
    if(!user) {
        res.status(404).send({error: `User with id ${idNumber} was not found`})
        return null;
    }
   
    return user;
}

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

exports.modifyUserByID =
async (req, res) => {
    const userToBeChanged = await getUser(req, res);
    if (!userToBeChanged) {
        return;
    }
    if (
        !req.body.EmailAddress ||
        !req.body.Password || !req.body.UserName
    ) {
        return res.status(400).send({error: 'Email, UseerName and password are required.'});
    }
    userToBeChanged.EmailAddress = req.body.EmailAddress;
    userToBeChanged.Password = await gimmePassword(req.body.Password);
    userToBeChanged.UserName = req.body.UserName;
    userToBeChanged.PhoneNumber2FA = req.body.PhoneNumber2FA || null;
    userToBeChanged.IsAdmin = req.body.IsAdmin === true || false;

    await userToBeChanged.save();
    return res
        .location(`${Utilities.getBaseURL(req)}/users/${userToBeChanged.UserID}`).sendStatus(201)
        .send(userToBeChanged
    );
}
