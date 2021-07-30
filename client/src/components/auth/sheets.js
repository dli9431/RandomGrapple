import { calcHandicapAvg, formatPlayers } from "./utils";

export const savePlayers = async (user, setup) => {
	let data = [];
	// find all added players
	for (var i = 0; i < setup.players.length; i++) {
		let tempArr = [];
		if (setup.players[i].weight > 0) {
			const handicap = calcHandicapAvg(setup, setup.players[i].weight, setup.players[i].expYr, setup.players[i].expMonth);
			tempArr.push(
				setup.players[i].lName !== undefined && setup.players[i].lName.length > 0 ? setup.players[i].name + " " + setup.players[i].lName : setup.players[i].name,
				setup.players[i].nickname,
				handicap,
				'0-0'
			)
			data.push(tempArr);
		}
	}
	
	const range = "Players!A" + (setup.players.length - data.length + 2).toString();
	const info = {
		spreadsheetId: user.spreadsheetId,
		body: {
			valueInputOption: 'RAW',
			data: {
				range: range,
				majorDimension: "ROWS",
				values: data
			}
		}
	}

	if (user.spreadsheetId.length > 0) {
		try {
			const res = await fetch("/api/savePlayers", {
				method: "POST",
				body: JSON.stringify(info),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			});

			const data = await res.json();
			if (data.status === 200) {
				// reformat player list
				let formatted = formatPlayers(setup);
				return formatted;
			}
		}
		catch (error) {
			console.log(error);
		}
	} else {

	}
}

export const readSheet = async (user, setup) => {
	if (user.spreadsheetId.length > 0) {
		try {
			const res = await fetch("/api/getSheetInfo", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});

			const data = await res.json();

			if (data.data.valueRanges.length > 0) {
				const hW = parseInt(data.data.valueRanges[1].values[0][1]);
				const xp = parseInt(data.data.valueRanges[1].values[0][2]);
				// setHandicapWeight(hW);
				// setHandicapExp(xp);

				// set handicap vars
				setup.handicaps = [];
				setup.handicaps.push({
					name: "Weight Handicap",
					unit: 'lbs',
					amount: hW,
					pts: parseInt(data.data.valueRanges[3].values[0][1])
				});
				setup.handicaps.push({
					name: "Experience Handicap",
					unit: 'months',
					amount: xp,
					pts: parseInt(data.data.valueRanges[3].values[0][2])
				});
				setup.setHandicaps = true;
				
				// setHandicaps(true);

				// form penalty objs
				let importedPenalties = [];
				let importedPenaltiesArr = [];
				const baseArr = data.data.valueRanges;
				const res = [...new Set([].concat(...baseArr.map((o, index) => { return (index > 5 ? o.values : []) })))];

				for (var i = 1; i < res[0].length; i++) {
					let temp = {};
					temp.desc = res[0][i];
					temp.pts = parseInt(res[1][i]);
					temp.type = res[2][i];
					temp.random = res[3][i] === 'TRUE' ? true : false;
					temp.limit = parseInt(res[4][i]);
					temp.category = parseInt(res[5][i]);
					temp.info = res[6][i];
					importedPenalties.push(temp);
				}

				// group penalties by category
				let curr = 1;
				let t = [];
				for (var k = 0; k < importedPenalties.length; k++) {
					if ((importedPenalties[k].category) === (curr + 1)) {
						importedPenaltiesArr.push(t);
						t = [];
						curr++;
					}

					if (importedPenalties[k].category === curr) {
						t.push(importedPenalties[k]);
						if (k === importedPenalties.length - 1) {
							importedPenaltiesArr.push(t);
						}
					}
				}

				setup.listPenalties = importedPenaltiesArr;

				// form player obj
				const playerRes = [...new Set([].concat(...baseArr.map((o, index) => { return (index > 12 ? o.values : []) })))];
				setup.players = [];

				for (var j = 1; j < playerRes[0].length; j++) {
					let temp = {};
					temp.name = playerRes[0][j].split(" ")[0];
					temp.lName = playerRes[0][j].split(" ")[1];
					temp.weight = -1;
					temp.expYr = -1;
					temp.expMonth = -1;
					temp.nickname = playerRes[1][j];
					temp.handicap = parseInt(playerRes[2][j]);
					temp.record = playerRes[3][j];
					// players.push(temp);
					setup.players.push(temp);
				}

				// add gym avg to setup obj
				setup.gymAvg = {
					weight: parseInt(res[11][0]),
					weightUnit: res[12][0],
					exp: parseInt(res[11][1]),
					expUnit: res[12][1]
				}

				// save latest match row
				setup.matches = {
					current: data.data.valueRanges[19].values[0].length + 1,
					tournaments: data.data.valueRanges[31].values[0].length + 1
				}

				return setup;
			}
		}
		catch (error) {
			console.log(error);
			return 'Session ended, please log in again.';
		}
	} else {
		return 'Not logged in.';
	}
}

export const createSheet = async (updateUser) => {
	try {
		const res = await fetch("/api/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await res.json();
		if (res.status === 200) {
			updateUser(data);
		}
	}
	catch (error) {
		console.log(error);
	}
}

export const saveMatch = async (user, match, mode, currMatch) => {
	let matchType = '';
	switch (parseInt(mode)) {
		case 0:
			matchType = 'sparring';
			break;
		case 1:
			matchType = 'quintet';
			break;
		case 2:
			matchType = 'single elimination';
			break;
		default:
			break;
	}

	let data = []; // match data
	let tempArr = [];
	
	tempArr.push(match.players.p1.lName !== undefined ? match.players.p1.name + " " + match.players.p1.lName : match.players.p1.name); // p1 name
	tempArr.push(match.players.p2.lName !== undefined ? match.players.p2.name + " " + match.players.p2.lName : match.players.p2.name); // p2 Name
	tempArr.push(match.winner); // winner
	tempArr.push(match.handicapDiff); // point differential
	tempArr.push(JSON.stringify(match.penalties)); // penalties applied
	tempArr.push(match.initTime); // roundtime
	tempArr.push(JSON.stringify(match.p1Score)); // p1 points
	tempArr.push(JSON.stringify(match.p2Score)); // p2 points
	tempArr.push(match.endTime); // finish time
	tempArr.push(match.winMethod); // finish method
	tempArr.push(new Date());
	tempArr.push(matchType);
	data.push(tempArr);

	const range = "Matches!A" + currMatch;
	const info = {
		spreadsheetId: user.spreadsheetId,
		body: {
			valueInputOption: 'RAW',
			data: {
				range: range,
				majorDimension: "ROWS",
				values: data
			}
		}
	}

	if (user.spreadsheetId.length > 0) {
		try {
			const res = await fetch("/api/saveMatch", {
				method: "POST",
				body: JSON.stringify(info),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			});

			const data = await res.json();
			if (data.status === 200) {
				// reformat player list
				// formatPlayers();
				return data.rows;
			}
		}
		catch (error) {
			console.log(error);
		}
	} else {

	}
}

export const saveTournament = async (user, matches, setup) => {
	let data = []; // match data
	let tempArr = [];
	
	tempArr.push(setup.tournamentInfo.title);
	tempArr.push(setup.tournamentInfo.date);
	tempArr.push(setup.tournamentInfo.mode);
	tempArr.push(setup.tournamentInfo.location);
	
	let playerArr = [];
	for (var i = 0; i < setup.tournamentInfo.players.length; i++) {
		playerArr.push(setup.tournamentInfo.players[i].name);
	}
	tempArr.push(JSON.stringify(playerArr)); // all players
	tempArr.push(setup.tournamentInfo.team1); // team 1 name
	playerArr = [];
	for (var j = 0; j < setup.tournamentInfo.team1players.length; j++) {
		if (setup.tournamentInfo.team1players[j].name === setup.tournamentInfo.t1Cap.name) {
			playerArr.push(setup.tournamentInfo.team1players[j].name + ' (c)');
		} else {
			playerArr.push(setup.tournamentInfo.team1players[j].name);
		}
	}
	tempArr.push(JSON.stringify(playerArr)); // team 1 players
	tempArr.push(setup.tournamentInfo.team2); // team 2 name
	playerArr = [];
	for (var k = 0; k < setup.tournamentInfo.team2players.length; k++) {
		if (setup.tournamentInfo.team2players[k].name === setup.tournamentInfo.t2Cap.name) {
			playerArr.push(setup.tournamentInfo.team2players[k].name + ' (c)');
		} else {
			playerArr.push(setup.tournamentInfo.team2players[k].name);
		}
	}
	tempArr.push(JSON.stringify(playerArr)); // team 2 players
	tempArr.push(setup.tournamentInfo.winnerTeam);
	data.push(tempArr);

	const range = "Tournament!A" + setup.matches.tournaments;
	const info = {
		spreadsheetId: user.spreadsheetId,
		body: {
			valueInputOption: 'RAW',
			data: {
				range: range,
				majorDimension: "ROWS",
				values: data
			}
		}
	}

	if (user.spreadsheetId.length > 0) {
		try {
			const res = await fetch("/api/saveTournament", {
				method: "POST",
				body: JSON.stringify(info),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}
			});

			const data = await res.json();
			if (data.status === 200) {
				// reformat player list
				// formatPlayers();
				return data.rows;
			}
		}
		catch (error) {
			console.log(error);
		}
	} else {

	}
}
