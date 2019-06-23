// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

var friends = require('../data/friends');

module.exports = function(app) {
  // API GET Requests
  app.get('/api/friends', function(req, res) {
    return res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var newfriend = req.body;

    friends.push(newfriend);

    res.json(newfriend);
  });
};
