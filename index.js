//Noteify Final Project

// import firebase module
var fb = require('firebase')

// initialize the app
var appIni = fb.initializeApp({
  apiKey: "AIzaSyBQZNSXZK1EVIoez75smdeqEgS3yu3rwi0",
  authDomain: "noteify-d7193.firebaseapp.com",
  databaseURL: "https://noteify-d7193-default-rtdb.firebaseio.com/",
  projectId: "noteify-d7193",
  storageBucket: "noteify-d7193.appspot.com",
  messagingSenderId: "259103554370",
  appId: "1:259103554370:web:bb31e247835601343266db",
  measurementId: "G-DXJET6RER1" });

// create firebase instance
var firebaseDB = fb.database()

// use express and create app object
const express = require('express')
const app = express()
var url = require('url')
app.use(express.static(__dirname + '/static'))
const port = process.env.PORT || 8080;


// main function to send data to the firebase database
app.get('/submitNote', (request, response) => {

  // get title and note data from static page
  var inputs = url.parse(request.url, true).query
  const title = (inputs.title)
  const note = (inputs.note)
  // get username and put it as ref below

  // send data to database with currently logged in user
  fb.auth().onAuthStateChanged(function(user) {
    if (user) {
      // user ID identifies user in database with their title and notes
      var uid = user.uid
      firebaseDB.ref(`${uid}/` + title).set({ theNote: note});
      response.send("")
    }
  });
})

// main function to send data to the firebase database
app.get('/deleteNote', (request, response) => {

  // get title and note data from static page
  var inputs = url.parse(request.url, true).query
  const title = (inputs.title)
  const note = (inputs.note)
  // get username and put it as ref below

  // send data to database with currently logged in user
  fb.auth().onAuthStateChanged(function(user) {
    if (user) {

      // Delete the note
      var uid = user.uid

      // DELETE DATA HERE 



      response.send("")
    }
  });
})


// Log user in
app.get('/loginUser', (request, response) => {

  // Get the email and password from static page
	var inputs = url.parse(request.url, true).query
	const email = (inputs.email)
	const password = (inputs.password)

  fb.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) =>  {
    var user = userCredential.user
    const email1 = user.email
    response.send(email1)
  })

  .catch((error) => {
    var errorMessage = error.message
    if (error) {
      response.type('text/plain')
      response.send(errorMessage)
    }
  })
});

// Create user account
app.get('/createAccount', (request, response) => {
	var inputs = url.parse(request.url, true).query
	const email = (inputs.email)
	const password = (inputs.password)

  fb.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {

    // if creation is successful, check if user is logged in and return user ID.
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        const email = user.email;
        response.type('text/plain')
        response.send(email) }
    });
  })
  .catch(function(error) {
    var errorMessage = error.message

    if (error) {
      response.type('text/plain')
      response.send(errorMessage)
    }
  })
});

// Verify a user's email
app.get('/verify', (request, response) => {
 
  user = fb.auth().currentUser;
  user.sendEmailVerification()
  .then(function() {
    fb.auth().onAuthStateChanged(function(user) {
      if (user) {
        response.send("Verified")
      }
    });
  })
  .catch(function(error) {
    var errorMessage = error.message

    if (error) {
      response.type('text/plain')
      response.send(errorMessage)
    }
  })
});

// Function to check if user is logged in and if their account is verified. If they are, return their email.
app.get('/islogged', (request, response, next) => {
  fb.auth().onAuthStateChanged(function(user) {
    
    if (user && user.emailVerified) {
        const email = user.email
        response.send(email)
        next()
        
    } else if (user && !user.emailVerified) {
        response.send("NoVerify")
        next()
    } else {
      response.send("NoLog")
    }
  });
});

// Function to grab user UID and pull notes
app.get('/getNotes', (request, response) => {
  fb.auth().onAuthStateChanged(function(user) {
      
      if (user) {
        var uid = user.uid;
        return firebaseDB.ref(`${uid}/`).once('value').then((snapshot) => {
          response.send(snapshot.val());
        });
      } 
      else {
        response.send("Login to view your notes")
      }
    });
  });


// Log the user out
app.get('/logoutUser', (request, response) => {

  fb.auth().signOut().then(() => {
    response.send("out")
  })
});

// Delete user account and notes (not working right now)
app.get('/deleteAccount', (request, response) => {
  var user = fb.auth().currentUser;

  user.delete().then(function() {
    response.send("good")
  }).catch(function(error) {
    var errorMessage = error.message
    response.send(errorMessage)
  });
});

// custom 500 page
app.use((err, request, response, next) => {
	console.error(err.message)
	response.type('text/plain')
	response.status(500)
	response.send('500 - Server Error')
})

// listen on the port
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))