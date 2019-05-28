const express = require('express');

// configs
const port = process.env.PORT ||  3001;

// ExpressJs Setup
const app = express();

const routes = require('./routes'); 
app.use(routes);

app.listen(port,  function() {
    console.log(`Express server escutando porta ${port}`);
});

module.exports = app; 