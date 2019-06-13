const artistRoute = require('./artist');

module.exports = function(app, db) {
    artistRoute(app, db);
};