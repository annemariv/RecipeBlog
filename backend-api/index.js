require('dotenv').config();
const port = process.env.PORT || 9000;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerDocument = yamljs.load('./docs/swagger.yaml');
//const swaggerDocument = require('./docs/swagger.json');
const { sync } = require('./db');

//app.get('/recipes', (req, res) => {
//    res.send(["recipe1", "recipe2", "recipe3"])
//})

app.use(cors());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());

require('./routes/RecipeRoutes.js')(app);
require('./routes/UserRoutes.js')(app);
require('./routes/SavedRecipes.js')(app);


app.listen(port, async () => {
    if (process.env.SYNC === 'true') {await sync();}
    console.log(`API address: http://localhost:${port}`)
})