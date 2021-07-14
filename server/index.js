const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const initialSheetReq = require('./sheetsReq');
const PORT = process.env.PORT || 3001;
const app = express();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const opn = require('open');
const environment = 'dev';
const destroyer = require('server-destroy');

const keyPath = path.join(__dirname, '../oauth2.keys.json');

let keys = { redirect_uris: ['http://localhost:3000/api/auth/oauth2callback'] };
if (fs.existsSync(keyPath)) {
	keys = require(keyPath).web;
}

const oauth2Client = (environment === 'dev') ?
	new google.auth.OAuth2(keys.client_id, keys.client_secret, keys.redirect_uris[0]) :
	new google.auth.OAuth2(process.env.google_client_id, process.env.google_client_secret, process.env.google_redirect_uris);

google.options({ auth: oauth2Client });

const scopes = [
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/userinfo.profile',
	'openid',
	'https://www.googleapis.com/auth/drive.file',
];

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var sess = {
	secret: "keyboard cat",
	resave: false,
	saveUninitialized: true,
	cookie: {},
}

if (environment === "production") {
	sess.cookie.secure = true;
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

passport.use(new GoogleStrategy({
	clientID: environment === "dev" ? keys.client_id : process.env.google_client_id,
	clientSecret: environment === "dev" ? keys.client_secret : process.env.google_client_secret,
	callbackURL: environment === "dev" ? keys.redirect_uris[0] : process.env.google_redirect_uris,
},
	function (accessToken, refreshToken, profile, cb) {
		profile.accessToken = accessToken;
		profile.refreshToken = refreshToken;
		return cb(null, profile);
	}
));

app.get('/api/auth/google',
	passport.authenticate('google', { scope: scopes.join(" ") }),
	function (req, res) { }
);

app.get('/api/auth/oauth2callback',
	passport.authenticate('google', { failureRedirect: '/error' }),
	function (req, res) {
		// Successful authentication, redirect success.
		res.redirect('/oauth2callback');
	}
);

app.get("/api/getUserInfo", async (req, res) => {
	try {
		if (req.user !== undefined) {
			res.status(200);
			res.json(req.user.name);
		}
	} catch (err) {
		console.error(err);
	}
})

app.get("/api/getSheet", async (req, res) => {
	try {
		res.status(200);
		res.json(req.user.spreadsheetId);
	} catch (err) {
		console.error(err);
	}
})

app.post("/api/create", async (req, res) => {
	try {
		oauth2Client.credentials = { access_token: req.user.accessToken };
		const cr = await createSheet(oauth2Client);

		if (cr.spreadsheetId !== undefined && cr.spreadsheetId.length > 0) {
			req.user.spreadsheetId = cr.spreadsheetId;
			res.status(200);
			res.json(cr.spreadsheetId);
		} else if (cr.id !== undefined && cr.id.length > 0) {
			req.user.spreadsheetId = cr.id;
			res.status(200);
			res.json(cr.id);
		}
		else {
			res.status = cr;
			res.json("error");
		}
	} catch (error) {
		console.error(error);
	}
});

app.delete("/api/auth/google/logout", async (req, res) => {
	try {
		await req.session.destroy();
		res.status(200);
		res.json({
			message: "Logged out successfully"
		});
	} catch (error) {
		// res.status(error.status);
		res.json(error);
	}
})

app.get('*', (req, res) => {
	if (environment === "production") {
		res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
	} else {
		res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
	}
});

app.listen(PORT, () => {
	console.log(`server listening on ${PORT}`);
});

// async function readSheet(auth) {
// 	const sheets = google.sheets({ version: 'v4', auth });
// 	sheets.spreadsheets.values.get({
// 		spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
// 		range: 'Class Data!A2:E',
// 	}, (err, res) => {
// 		if (err) return console.log('The API returned an error: ' + err);
// 		const rows = res.data.values;
// 		if (rows.length) {
// 			console.log('Name, Major:');
// 			// Print columns A and E, which correspond to indices 0 and 4.
// 			rows.map((row) => {
// 				console.log(`${row[0]}, ${row[4]}`);
// 			});
// 		} else {
// 			console.log('No data found.');
// 		}
// 	});
// }

async function createSheet(auth) {
	try {
		const drive = google.drive({ version: 'v3', auth });
		const response = await drive.files.list({
			q: "name='RandomGrapple[default]'"
		});

		// if already created, return spreadsheet file info
		if (response.data.files.length > 0) {
			if (response.status === 200) {
				return response.data.files[0];
			}
			else {
				return response.status;
			}
		} else {
			try {
				// create new default spreadsheet
				const request = initialSheetReq.create();
				const sheets = google.sheets({ version: 'v4', auth });
				const res = await (sheets.spreadsheets.create(request));

				if (res.status === 200) {
					return res.data;
				} else {
					return res.status;
				}
			} catch (err) {
				console.error(err);
			}
		}
	} catch (err) {
		console.error(err);
	}
}
