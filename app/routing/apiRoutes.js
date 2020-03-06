var path = require("path");

var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api.friends", function(req, res){
        var userInput = req.body;

        var userResponses = userInput.scores;

        var matchedName = "";
        var matchedImage= "";
        var totalDiff = 90000;

        for(var i = 0; 0 < friends.length; i++){
            var difference = 0;
            for (var j = 0; j < userResponses.length; j++) {
                difference += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            if (difference < totalDiff) {
                totalDiff = difference;
                matchedName = friends[i].name;
                matchedImage = friends[i].image;
            }
        }

        friends.push(userInput);
        res.json({status: "OK", matchedName: matchedName, matchedImage: matchedImage})
    });
};