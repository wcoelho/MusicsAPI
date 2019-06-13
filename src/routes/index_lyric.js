const lyricRoute = require('./lyric');

module.exports = function(app, db) {
    lyricRoute(app, db);
};