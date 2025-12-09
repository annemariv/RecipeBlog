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

exports.getByID = 
async (req, res) => {
    const challenge = await getChallenge(req, res);
    if (!challenge) {return res.status(404).send({error: 'Recipe not found'});}
    return res.status(200).send(challenge);
}

exports.create = async (req, res) => {
    if (!req.body.Title || !req.body.Description) {
        return res.status(400).send({error: 'Title and description are required.'});
    }

    const newChallenge = {
        Title: req.body.Title,
        Description: req.body.Description,
        Is_active: req.body.Is_active || true,
        
    }

    const createdChallenge = await db.challenge.create(newChallenge);
    return res.location(`${Utilities.getBaseURL(req)}/challenges/${createdChallenge.ChallengeID}`).sendStatus(201);
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