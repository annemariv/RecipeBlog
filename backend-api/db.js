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

const sync = (async () => {
    await sequelize.sync({});
    console.log('DB sync has been completed')
})

module.exports = {db, sync};