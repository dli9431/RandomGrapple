export const formatPlayers = async (setup) => {
	try {
		for (var i = 0; i < setup.players.length; i++) {
			if (setup.players[i].weight > 0) {
				let name = setup.players[i].name;
				if (setup.players[i].name.split(' ').length > 1) // split first/last name
				{
					setup.players[i].name = name.split(' ')[0];
					setup.players[i].lName = name.split(' ')[1];
				}
			}
		}
		return setup;
	} catch(err) {
		console.error(err);
	}
}

export function calcHandicapAvg(setup, weight, expYr, expMonth) {
	// compare to imported handicaps
	let totalHandicap = 0;
	let weightHandicap = ((weight - setup.gymAvg.weight) / setup.handicaps[0].amount) * setup.handicaps[0].pts;
	let xpHandicap = ((((expYr * 12) + expMonth) - setup.gymAvg.exp) / setup.handicaps[1].amount) * setup.handicaps[1].pts;
	weightHandicap *= -1;
	xpHandicap *= -1;
	totalHandicap += weightHandicap;
	totalHandicap += xpHandicap;
	return Math.round(totalHandicap);
}
