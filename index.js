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

  // send data to database
  // user ref below will be replaced with username.
  firebaseDB.ref("users/").set({theTitle: title, theNote: note });
})

// Functions for user authenticaiton

app.get('/login', (request, response) => {
  // Get the email and password from static page
	var inputs = url.parse(request.url, true).query
	const email = (inputs.email)
	const password = (inputs.password)

  fb.auth().signInWithEmailAndPassword(email, password)
  
  .then(function()  {
    var user = fb.auth.currentUser
    var databaseRef = firebaseDB.ref()
    var userData = {
      lastLogin : Date.now()
    }
    databaseRef.child('users/' + user.uid).update(userData)
  })
  .catch(function(error) {
    var errorCode = error.code
    var errorMessage = error.message
    
  })
});

app.get('/createAccount', (request, response) => {
	var inputs = url.parse(request.url, true).query
	const email = (inputs.email)
	const password = (inputs.password)

  fb.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = fb.auth.currentUser
    var databaseRef = firebaseDB.ref()
    var userData = {
      email : email,
      lastLogin : Date.now()
    }
    databaseRef.child('users/' + user.uid).set(userData)
  })
  .catch(function(error) {
    var errorCode = error.code
    var errorMessage = error.message
    
  })
});

app.get('/logout', (request, response) => {
  fb.auth().signOut
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