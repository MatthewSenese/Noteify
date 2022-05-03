# Noteify
Note taking web app for the final team project with Matt O'Malley, Matthew Senese, & Jonathan Rayo
Software Engineering, Spring 2022, Lewis University

Required: 
- firebase version 7.24

Known errors:
- No token/cookie implementation, anyone using site will be logged in as
	current user if they didn't log out.
- cannot use punctuation in note input, split functions break it because
	data is returned as a string with object delimiters still attached.