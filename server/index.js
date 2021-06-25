const { google } = require('googleapis');
const express = require('express');
const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const opn = require('open');
const environment = 'dev';
const destroyer = require('server-destroy');

const keyPath = path.join(__dirname, '../oauth2.keys.json');

let keys = { redirect_uris: ['http://localhost:3000/oauth2callback'] };
if (fs.existsSync(keyPath)) {
	keys = require(keyPath).web;
}

const oauth2Client = (environment == 'dev') ?
	new google.auth.OAuth2(keys.client_id, keys.client_secret, keys.redirect_uris[0]) :
	new google.auth.OAuth2(process.env.google_client_id, process.env.google_client_secret);

google.options({ auth: oauth2Client });

// const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets'];
// this.authorizeUrl = client.generateAuthUrl({
// 	access_type: 'offline',
// 	scope: scopes,
// });

const scopes = [
	'https://www.googleapis.com/auth/contacts.readonly',
	'https://www.googleapis.com/auth/user.emails.read',
	'profile',
];

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

// app.get('/oauth2callback', (req, res) => {
// 	const code = req.query.code;
// 	client.getToken(code, (err, tokens) => {
// 		if (err) {
// 			console.error('Error getting oAuth tokens: ');
// 			throw err;
// 		}
// 		client.credentials = tokens;
// 		res.send('Authentication successful! Please return to the console.');
// 		server.close();
// 	})
// });

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// const server = app.listen(PORT, () => {
// 	opn(this.authorizeUrl, {wait: false});
// });

app.listen(PORT, () => {
	console.log(`server listening on ${PORT}`);
});

async function authenticate(scopes) {
	return new Promise((resolve, reject) => {
		// grab the url that will be used for authorization
		const authorizeUrl = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: scopes.join(' '),
		});
		const server = http
			.createServer(async (req, res) => {
				try {
					if (req.url.indexOf('/oauth2callback') > -1) {
						const qs = new url.URL(req.url, 'http://localhost:3000')
							.searchParams;
						res.end('Authentication successful! Please return to the console.');
						server.destroy();
						const { tokens } = await oauth2Client.getToken(qs.get('code'));
						oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
						resolve(oauth2Client);
					}
				} catch (e) {
					reject(e);
				}
			})
			.listen(3000, () => {
				// open the browser to the authorize url to start the workflow
				opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
			});
		destroyer(server);
	});
}

async function runSample() {
	// retrieve user profile
	const res = await people.people.get({
		resourceName: 'people/me',
		personFields: 'emailAddresses',
	});
	console.log(res.data);
}



// authenticate(scopes)
// 	.then(client => runSample(client))
// 	.catch(console.error);