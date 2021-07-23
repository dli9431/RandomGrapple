export const saveMatch = async (user, match) => {
	let data = [];
	console.log(user);
	console.log(match);
	
	// // find all added players	
	// for (var i = 0; i < setup.players.length; i++) {
	// 	let tempArr = [];
	// 	if (setup.players[i].weight > 0) {
	// 		const handicap = calcHandicapAvg(setup.players[i].weight, setup.players[i].expYr, setup.players[i].expMonth);
	// 		tempArr.push(
	// 			setup.players[i].name,
	// 			setup.players[i].nickname,
	// 			handicap,
	// 			'0-0'
	// 		)
	// 		data.push(tempArr);
	// 	}
	// }
	// const range = "Players!A" + (setup.players.length - data.length + 2).toString();
	// const info = {
	// 	spreadsheetId: user.spreadsheetId,
	// 	body: {
	// 		valueInputOption: 'RAW',
	// 		data: {
	// 			range: range,
	// 			majorDimension: "ROWS",
	// 			values: data
	// 		}
	// 	}
	// }

	// if (user.spreadsheetId.length > 0) {
	// 	try {
	// 		const res = await fetch("/api/savePlayers", {
	// 			method: "POST",
	// 			body: JSON.stringify(info),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				"Accept": "application/json"
	// 			}
	// 		});

	// 		const data = await res.json();
	// 		if (data.status === 200) {
	// 			// reformat player list
	// 			formatPlayers();
	// 		}
	// 	}
	// 	catch (error) {
	// 		console.log(error);
	// 	}
	// } else {

	// }
}
