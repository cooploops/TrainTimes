// Initialize Firebase
var config = {
  apiKey: "AIzaSyAbRL9IUBZ-Xr1Q15HbV5x_0RvseK_VmZE",
  authDomain: "traintimes-c310d.firebaseapp.com",
  databaseURL: "https://traintimes-c310d.firebaseio.com",
  projectId: "traintimes-c310d",
  storageBucket: "",
  messagingSenderId: "426995379590"
};
firebase.initializeApp(config);

var database = firebase.database();

  window.onload = function(){

    // create object to hold data to be stored
    var trainData = {
      trainName: "",
      destination: "",
      firstDepart: 0,
      freq: 0
    }
    // when addTrain button is pushed it grabs the values from the input boxes and stores them in the database at the Root
    $("#addTrain").on("click", function(event){
      event.preventDefault();

      trainData.trainName = $("#trainName").val().trim();
      trainData.destination = $("#destination").val().trim();
      trainData.firstDepart = $("#firstDepart").val().trim();
      trainData.freq = $("#freq").val().trim();

      database.ref().push({trainData});
      // clear input boxes after submission made
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstDepart").val("");
      $("#freq").val("");      
      
    });

  }

database.ref().on("child_added", function(snapshot){

  var trainName = snapshot.val().trainData.trainName;
  var destination = snapshot.val().trainData.destination;
  var firstDepart = snapshot.val().trainData.firstDepart;
  var freq = snapshot.val().trainData.freq;

  var timeNow = moment();
  var timeDepart = moment(firstDepart,"HH:mm");
  // if train has already started running then run first function
  if(moment(timeNow).format("X") >= moment(timeDepart).format("X")){
    var diff = timeNow.diff(timeDepart, 'minutes');
    var minutesSinceLastTrain = diff%freq;
    var minutesTillNextTrain = freq - minutesSinceLastTrain;
    var timeSinceLastTrain = moment.duration(minutesTillNextTrain, 'minutes');
    var timeTillNextTrain = timeNow.add(timeSinceLastTrain).format("hh:mm a");

    $("#trainTable > tbody").append(
      "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freq + "</td><td>" + timeTillNextTrain +"</td><td>" + minutesTillNextTrain + "</td><td id='onTime'> On Time</td>"
      )
    // else the first train hasn't departed yet and will set the next departure to the first departure
  } else {
      var timeTillNextTrain = moment(firstDepart,"HH:mm").format("hh:mm a");
      var minutesTillNextTrain = timeDepart.diff(timeNow,'minutes');
      $("#trainTable > tbody").append(
      "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freq + "</td><td>" + timeTillNextTrain +"</td><td>" + minutesTillNextTrain + "</td><td id='notDeparted'> Not Departed</td>"
      )
  }

});