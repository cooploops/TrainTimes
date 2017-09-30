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
  console.log(snapshot.val().trainData.destination);

  var trainName = snapshot.val().trainData.trainName;
  var destination = snapshot.val().trainData.destination;
  var firstDepart = snapshot.val().trainData.firstDepart;
  var freq = snapshot.val().trainData.freq;

  var timeNow = moment();
  console.log(moment(timeNow).format("X"));
  var timeDepart= moment(firstDepart,"HH:mm");
  console.log(moment(timeDepart).format("X"));
  if(moment(timeNow).format("X") >= moment(timeDepart).format("X")){
    var diff = timeNow.diff(timeDepart, "X");
  } else {
    var diff = timeDepart.diff(timeNow, "X")
  }
  console.log(diff);
  var freqMoment = moment(freq,"mm").format("X");
  console.log(freqMoment);
  

  // $("#trainTable > tbody").append(
  //   "<tr><td> + "
  //   )

});