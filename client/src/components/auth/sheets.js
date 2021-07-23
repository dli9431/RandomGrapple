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
	data.push(match.players.p1.lName !== undefined ? match.players.p1.name + " " + match.players.p1.lName : match.players.p1.name); // p1 name
	data.push(match.players.p2.lName !== undefined ? match.players.p2.name + " " + match.players.p2.lName : match.players.p2.name); // p2 Name
	data.push(match.winner); // winner
	data.push(match.handicapDiff); // point differential
	data.push(match.penalties); // penalties applied
	data.push(match.initTime); // roundtime
	data.push(match.p1Score); // p1 points
	data.push(match.p2Score); // p2 points
	data.push(match.endTime); // finish time
	data.push(match.winMethod); // finish method
	data.push(new Date());
	data.push(matchType);

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
