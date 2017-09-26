// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold answers to the survey questions
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server
    // Then the server saves the data to the friendData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        var currentUser = req.body;
        var bestFriend;
        var compatibility = 51;
        // Loop through all friends currently in the friend array, testing for best match
        for (var i = 0; i < friendData.length; i++) {
            // If the current friend from friend data has the lowest compatibility score (best match)...
            if (compareData(currentUser, friendData[i]) <= compatibility) {
                // Set the compatibility score to the new value and set the bestFriend to be the current friend
                compatibility = compareData(currentUser, friendData[i]);
                bestFriend = friendData[i];
            }
        }
        // Add the user to the friend array
        friendData.push(req.body);
        // Return the bestFriend as a response
        res.json(bestFriend);
    });
};

function compareData(user1, user2) {
    var compatibility = 0;
    for (var i = 0; i < user1.scores.length; i++) {
        compatibility += Math.abs(user1.scores[i] - user2.scores[i]);
    }

    return compatibility;
}
