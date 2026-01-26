const {Sequelize, DataTypes} = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Session'
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.recipes = require('./models/Recipe.js')(sequelize, DataTypes);
db.users = require('./models/User.js')(sequelize, DataTypes);
db.savedRecipes = require('./models/SavedRecipe.js')(sequelize, DataTypes, db.recipes, db.users);

db.recipes.belongsToMany(db.users, {through: db.savedRecipes, as: "SavedRecipes"});
db.users.belongsToMany(db.recipes, {through: db.savedRecipes});

const sync = (async () => {
    await sequelize.sync({});
    await sessionStore.sync();
    console.log('DB sync has been completed')
})

module.exports = {db, sync, sessionStore};