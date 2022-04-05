//Noteify Final Project

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