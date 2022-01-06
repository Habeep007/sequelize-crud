const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`)
    });
}).catch();