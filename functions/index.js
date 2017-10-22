const functions = require('firebase-functions');
const admin = require('firebase-admin')
 admin.initializeApp(functions.config().firebase)
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });


exports.aggregateCount = functions.firestore
  .document('requests/{requestsId}')
  .onWrite(event => {
    // Get value of the newly added rating
    var status = event.data.get('status');
    var oldStatus = '';
    if (event.data.previous) {
      oldStatus = event.data.previous.get("status");
    }


    var charityID = event.data.get('charityID');
    var userID = event.data.get('userID');

    /** charity : "charity",
         ServiceCategories : "ServiceCategories",
         users : "user",
         service : "service",
         request : "requests" */
    //'accepted' | 'declined' | 'pending'

    
    // Get a reference to the restaurant
    var charityRef = db.collection('charity').document(charityID);
    var userRef = db.collection('user').document(userID);

    // Update aggregations in a transaction
    return db.runTransaction(transaction => {
      return transaction.get(charityRef).then(charityDoc => {
        // Compute new number of ratings
        var old
        var pendingCount = charityDoc.data('pendingCount') || 0;
        var acceptedCount = charityDoc.data('acceptedCount') || 0;
        var declinedCount = charityDoc.data('declinedCount') || 0;

        if (oldStatus == "pending") {
          pendingCount = pendingCount == 0 ? 0 : --pendingCount
        } else if (oldStatus == "declined") {
          declinedCount = declinedCount == 0 ? 0 : --declinedCount
        } else if (oldStatus == "accepted") {
          acceptedCount = acceptedCount == 0 ? 0 : --acceptedCount
        }



        if (status == "pending") {
          pendingCount = pendingCount == 0 ? 0 : ++pendingCount
        } else if (status == "declined") {
          declinedCount = declinedCount == 0 ? 0 : ++declinedCount
        } else if (status == "accepted") {
          acceptedCount = acceptedCount == 0 ? 0 : ++acceptedCount
        }



        return transaction.update(charityRef, {
          declinedCount: 0,
          acceptedCount: 0,
          pendingCount: 0
        });

      });
    });
  });
