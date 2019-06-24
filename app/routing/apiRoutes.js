// LOAD DATA

var friends = require('../data/friends');

module.exports = function(app) {
  // API GET Requests
  app.get('/api/friends', function(req, res) {
    return res.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var bestMatch = {
      name: '',
      photo: '',
      friendDifference: Infinity
    };

    // Here we take the result of the user"s survey POST
    var userData = req.body;
    var userScores = userData.scores;

    // calculate the difference

    var totalDifference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      //nested loop for friend score
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        //calculate the difference between the scores
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData);

    res.json(bestMatch);
  });
};
