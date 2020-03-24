// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCexhZit0XZf8MdhAg57PJVzFoMKjdqv-k",
  authDomain: "train-scheduler-ee926.firebaseapp.com",
  databaseURL: "https://train-scheduler-ee926.firebaseio.com",
  projectId: "train-scheduler-ee926",
  storageBucket: "train-scheduler-ee926.appspot.com"
};

firebase.initializeApp(config);

//Add currrent time with moment.js
var database = firebase.database();
$(".current-time").html(moment().format('LTS'));

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

    // Grab from the form
    var trnName = $("#train-name-input").val().trim();
    var trnDest= $("#destination-input").val().trim();
    var trnFreq = $("#frequency-input").val().trim(); 
    var trnArrival = $("#next-input").val().trim();
    var trnMinutesAway = $("#minutes-away").val().trim();
   
    // Create temp object to store what we grabbed
    var newTrain = {
      name: trnName,
      destination: trnDest,
      frequency: trnFreq,
      arrival: trnArrival,
      minutes: trnMinutesAway
    };
  
    // push info to Firebase
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.arrival);
  
    alert("Train successfully added");
  
    // Clear
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#next-input").val("");
    $("#minutes-away").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store in a variable.
    var trnName = childSnapshot.val().name;
    var trnDest = childSnapshot.val().destination;
    var trnFreq = childSnapshot.val().frequency;
    var trnArrival = childSnapshot.val().arrival;
    var trnMinutesAway = childSnapshot.val().minutes;


    // console Info
    console.log(trnName);
    console.log(trnDest);
    console.log(trnFreq);
    console.log(trnArrival);
    console.log(trnMinutesAway);

    $(".table > tbody").append($('<tr>').append(
    $("<td>").text(trnName),
    $("<td>").text(trnDest),
    $("<td>").text(trnFreq),
    $("<td>").text(trnArrival),
    $("<td>").text(trnMinutesAway),


    ));
  });