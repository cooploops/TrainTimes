  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqeua3U0m4B5QtbGZod07AsNxK35zHQ0U",
    authDomain: "my-awesome-project-c1de8.firebaseapp.com",
    databaseURL: "https://my-awesome-project-c1de8.firebaseio.com",
    projectId: "my-awesome-project-c1de8",
    storageBucket: "my-awesome-project-c1de8.appspot.com",
    messagingSenderId: "968353723398"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  window.onload = function(){

    var trainData = {
      trainName: "",
      dest: "",
      firstDepart: 0,
      freq: 0
    }

    $("#addTrain").on("click", function(event) {
      event.preventDefault();

      
    }

  }