const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: 'mariadb',
        logging: console.log,
    }
)

async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error("Unable to connect" + error)
    }
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.recipes = require('./models/Recipe.js')(sequelize, DataTypes);
db.users = require('./models/User.js')(sequelize, DataTypes);
db.savedRecipes = require('./models/SavedRecipe.js')(sequelize, DataTypes, db.recipes, db.users);

// define relations between models:
db.savedRecipes.hasMany(db.users)
db.users.hasMany(db.savedRecipes)
db.savedRecipes.hasMany(db.recipes)
db.recipes.hasMany(db.savedRecipes)

const sync = (async () => {
    await sequelize.sync({});
    console.log('DB sync has been completed')
})

module.exports = {db, sync};