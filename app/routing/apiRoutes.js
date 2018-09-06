// ===============================================================================
// LOAD DATA
// Links our routes to our data sources.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Code handles when users "visit" a page.
  // ---------------------------------------------------------------------------

  app.get("/api/friendfinder", function (req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Code handles a user's submit from a form and submits data to the server (as a JSON object).

  app.post("/api/friendfinder", function (req, res) {
    friends.push(req.body);

    // Code for best friend matching

    //Object to hold the best match
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 50
    };

    // Store the body of the request as a variable
    var userData = req.body;

    // Per instructions, create variable called totalDifference and set it 0 initially
    var totalDifference = 0;

    // Loop through all the friend possibilities in the database. 
    for (var i = 0; i < (friends.length - 1) ; i++) {

      //console.log(friends[i].name);
      totalDifference = 0;

      // Loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userData.scores[j]) - parseInt(friends[i].scores[j]));
        //console.log(totalDifference)

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch as the new modal best friend 
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference; // set the new difference as the proverbial "best friend benchmark"
          //console.log(bestMatch);
        }
      }
    }

    // Save the userData to the Database
   // friends.push(userData);

    // Return a JSON with the user's bestMatch that can be used later
    res.json(bestMatch);

  });
};