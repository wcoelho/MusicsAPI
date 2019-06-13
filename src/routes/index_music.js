const musicRoute = require('./music');

module.exports = function(app, db) {
    musicRoute(app, db);
};