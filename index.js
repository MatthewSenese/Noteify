//Noteify Final Project

var fb = require('firebase')

//initialize the app
var appIni = fb.initializeApp({
  apiKey: "AIzaSyBQZNSXZK1EVIoez75smdeqEgS3yu3rwi0",
  authDomain: "noteify-d7193.firebaseapp.com",
  databaseURL: "https://noteify-d7193-default-rtdb.firebaseio.com/",
  projectId: "noteify-d7193",
  storageBucket: "noteify-d7193.appspot.com",
  messagingSenderId: "259103554370",
  appId: "1:259103554370:web:bb31e247835601343266db",
  measurementId: "G-DXJET6RER1"
});

//
var firebaseDB = fb.database()

// Theoretically add data to firebase 
firebaseDB.ref("user").set("password")

// use express and create app object
const express = require('express')
const app = express()

var url = require('url')
app.use(express.static(__dirname + '/static'))
const port = process.env.PORT || 8080;


app.get('/login', (req, res) => {
	var inputs = url.parse(request.url, true).query
	const userName = (inputs.username)
	const passWord = (inputs.password)
});

app.get('/create-account', (req, res) => {
	var inputs = url.parse(request.url, true).query
	const UserName = (inputs.newUsername)
	const PassWord = (inputs.newPassword)
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