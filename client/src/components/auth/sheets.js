export const saveMatch = async (user, match, mode, currMatch) => {
	let matchType = '';
	switch (parseInt(mode)) {
		case 0:
			matchType = 'sparring';
			break;
		case 1:
			matchType = 'single elimination';
			break;
		case 2:
			matchType = 'quintet';
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
				console.log('ok');
			}
		}
		catch (error) {
			console.log(error);
		}
	} else {

	}
}
