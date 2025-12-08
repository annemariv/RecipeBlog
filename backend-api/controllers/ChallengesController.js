const {db} = require('../db');
const Utilities = require('./Utilities');
const UUID = require('uuid');

exports.getAll = 
async (req, res) => {
    const challenges = await db.challenge.findAll();
    console.log("getAll:"+ challenges)
    res
    .status(200)
    .send(challenges.map(({ChallengeID,Title}) => {return {ChallengeID,Title}}));
}


const getChallenge = 
async (req, res) => {
    const idNumber = req.params.ChallengeID;
    
    // if (UUID.validate(idNumber) !== true) {
    //     res.status(400).send({error: `Entered id is not valid ${idNumber}`})
    //     return null;
    // }

    const challenge = await db.challenge.findByPk(idNumber);
    if(!challenge) {
        res.status(404).send({error: `Challange with id ${idNumber} was not found`})
        return null;
    }
   
    return challenge;
}