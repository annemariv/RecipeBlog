const {db} = require('../db');
const {gimmePassword, letMeIn} = require('./Utilities');

exports.getAll = 
async (req, res) => {
    const users = await db.users.findAll();
    console.log("getAll:"+ users)
    res
    .status(200)
    .send(users.map(({UserID,UserType}) => {return {UserID,UserType}}));
}

exports.hashPassword = async (password) => {
    return await gimmePassword(password);
}

exports.verifyPassword = async (plainPassword, hashedPassword) => {
    return await letMeIn(plainPassword, hashedPassword);
}
