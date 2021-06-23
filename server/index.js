const {google} = require('googleapis');
const express = require('express');
const path = require('path');
const { Server } = require('http');
const opn = require('open');

const client = new google.auth.OAuth2(
	process.env.google_client_id,
	process.env.google_client_secret
)

const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets'];

this.authorizeUrl = client.generateAuthUrl({
	access_type: 'offline',
	scope: scopes,
});

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

app.get('/oauth2callback', (req, res) => {
	const code = req.query.code;
	client.getToken(code, (err, tokens) => {
		if (err) {
			console.error('Error getting oAuth tokens: ');
			throw err;
		}
		client.credentials = tokens;
		res.send('Authentication successful! Please return to the console.');
		server.close();
	})
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const server = app.listen(PORT, () => {
	opn(this.authorizeUrl, {wait: false});
});

// app.listen(PORT, () => {
// 	console.log(`server listening on ${PORT}`);
// });