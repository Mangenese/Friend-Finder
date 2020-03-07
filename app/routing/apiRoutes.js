//require our dependencies 

var path = require("path");


var friends = require("../data/friends.js");
//allow the file to be called in other files
module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        console.log(req.body.scores);

    
    var user = req.body;

    // for loop to grab the scores and make them ints
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    
    var bestFriendIndex = 0;
    //set a high number so there is nothing that can skew the data
    var minimumDifference = 40;

    
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
          //this makes it so in case it goes negative it returns a positive integer
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      
      if(totalDifference < minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }

   
    friends.push(user);

    // send back to browser the best friend match
    res.json(friends[bestFriendIndex]);
  });
};
