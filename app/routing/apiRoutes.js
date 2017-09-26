// LOAD DATA
// Linking our routes to a series of "data" sources.
// These data sources hold answers to the survey questions

var friendData = require("../data/friends");


module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server
    // Then the server saves the data to the friendData array)

    app.post("/api/friends", function (req, res) {
        var currentUser = req.body;
        var loneliest;
        var goodMatch = 47;
        // Loop through all friends currently in the friend array, testing for best match
        for (var i = 0; i < friendData.length; i++) {
            // If the current friend from friend data has the lowest goodMatch score (best match)...
            if (findFriend(currentUser, friendData[i]) <= goodMatch) {
                // Set the goodMatch score to the new value and set the loneliest to be the current friend
                goodMatch = findFriend(currentUser, friendData[i]);
                loneliest = friendData[i];
            }
        }
        // Add the user to the friend array
        friendData.push(req.body);
        // Return the loneliest as a response
        res.json(loneliest);
    });
};

function findFriend(user1, user2) {
    var goodMatch = 0;
    for (var i = 0; i < user1.scores.length; i++) {
        goodMatch += Math.abs(user1.scores[i] - user2.scores[i]);
    }
    return goodMatch;
}
