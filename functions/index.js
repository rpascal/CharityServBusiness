const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });


exports.updateCharityCounts = functions.firestore
  .document('requests/{requestsId}')
  .onWrite(event => {
    // Get value of the newly added rating
    var status = '';
    if (event.data.exists) {
      status = event.data.get('status');
    }
    var oldStatus = '';
    if (event.data.previous) {
      oldStatus = event.data.previous.get("status");
    }


    var charityID = event.data.get('charityID');

    /** charity : "charity",
         ServiceCategories : "ServiceCategories",
         users : "user",
         service : "service",
         request : "requests" */
    //'accepted' | 'declined' | 'pending'


    // Get a reference to the restaurant
    var charityRef = admin.firestore().collection('charity').doc(charityID);

    // Update aggregations in a transaction
    return admin.firestore().runTransaction(transaction => {
      return transaction.get(charityRef).then(charityDoc => {
        // Compute new number of ratings
        // var old
        var pendingCount = charityDoc.get('pendingCount') || 0;
        var acceptedCount = charityDoc.get('acceptedCount') || 0;
        var declinedCount = charityDoc.get('declinedCount') || 0;

        if (oldStatus == "pending") {
          pendingCount = pendingCount == 0 ? 0 : --pendingCount
        } else if (oldStatus == "declined") {
          declinedCount = declinedCount == 0 ? 0 : --declinedCount
        } else if (oldStatus == "accepted") {
          acceptedCount = acceptedCount == 0 ? 0 : --acceptedCount
        }



        if (status == "pending") {
          pendingCount = ++pendingCount
        } else if (status == "declined") {
          declinedCount = ++declinedCount
        } else if (status == "accepted") {
          acceptedCount = ++acceptedCount
        }



        return transaction.update(charityRef, {
          declinedCount: declinedCount,
          acceptedCount: acceptedCount,
          pendingCount: pendingCount
        });

      });
    });
  });

exports.updateUserCounts = functions.firestore
  .document('requests/{requestsId}')
  .onWrite(event => {
    // Get value of the newly added rating

    var status = '';
    if (event.data.exists) {
      status = event.data.get('status');
    }

    // var status = event.data.get('status');
    var oldStatus = '';
    if (event.data.previous) {
      oldStatus = event.data.previous.get("status");
    }



    var userID = event.data.get('userID');

    /** charity : "charity",
         ServiceCategories : "ServiceCategories",
         users : "user",
         service : "service",
         request : "requests" */
    //'accepted' | 'declined' | 'pending'



    var userRef = admin.firestore().collection('user').doc(userID);

    // Update aggregations in a transaction
    return admin.firestore().runTransaction(transaction => {
      return transaction.get(userRef).then(userDoc => {
        // Compute new number of ratings
        // var old
        var pendingCount = userDoc.get('pendingCount') || 0;
        var acceptedCount = userDoc.get('acceptedCount') || 0;
        var declinedCount = userDoc.get('declinedCount') || 0;

        if (oldStatus == "pending") {
          pendingCount = pendingCount == 0 ? 0 : --pendingCount
        } else if (oldStatus == "declined") {
          declinedCount = declinedCount == 0 ? 0 : --declinedCount
        } else if (oldStatus == "accepted") {
          acceptedCount = acceptedCount == 0 ? 0 : --acceptedCount
        }



        if (status == "pending") {
          pendingCount = ++pendingCount
        } else if (status == "declined") {
          declinedCount = ++declinedCount
        } else if (status == "accepted") {
          acceptedCount = ++acceptedCount
        }



        return transaction.update(userRef, {
          declinedCount: declinedCount,
          acceptedCount: acceptedCount,
          pendingCount: pendingCount
        });

      });
    });
  });
