const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json({extended: true}));

app.use(cors());

const expenseRoutes = require('./routes/expense');

app.use('/expense', expenseRoutes);

sequelize.sync()
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})


