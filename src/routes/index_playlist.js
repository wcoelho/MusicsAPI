const playlistRoute = require('./playlist');

module.exports = function(app, db) {
    playlistRoute(app, db);
};