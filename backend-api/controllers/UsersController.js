const {db} = require('../db');

exports.getAll = 
async (req, res) => {
    const users = await db.users.findAll();
    console.log("getAll:"+ users)
    res
    .status(200)
    .send(users.map(({UserID,UserType}) => {return {UserID,UserType}}));
}