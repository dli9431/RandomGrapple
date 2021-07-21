import React, { useState } from "react";
import { TextField, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Checkbox, Box } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export const calcHandicap = (player, setup) => {
	let weightHandicap = ((player.weight - setup.gymAvg.weight) / setup.handicaps[0].amount) * setup.handicaps[0].pts;
	let expHandicap = (((player.expYr * 12 + player.expMonth) - setup.gymAvg.exp) / setup.handicaps[1].amount) * setup.handicaps[1].pts;
	weightHandicap *= -1;
	expHandicap *= -1;
	let handicap = Math.round(weightHandicap + expHandicap);
	player.handicap = handicap;
	return player;
}

export const CalcHandicap = ({ setup, usedPoints, player1, player2 }) => {
	// user imported sheet, can mix/match handicaps
	if (Object.keys(setup.gymAvg).length > 0) {
		if (player1 !== null && player2 !== null) {
			if (player1.weight > 0 || player2.weight > 0) {
				// compare to gym avg
				if (player1.weight > 0) {
					// calc points vs avg
					player1 = calcHandicap(player1, setup);
				}
				if (player2.weight > 0) {
					player2 = calcHandicap(player2, setup);
				}
			}
			let text = calcHandicapText(setup, usedPoints, player1, player2);
			return text;
		}
	} else {
		// only calculate based on entered weight/xp
		if (player1 !== null && player2 !== null) {
			let text = calcHandicapText(setup, usedPoints, player1, player2);
			return text;
		}
	}

	return null;
}

export const calcHandicapText = (setup, usedPoints, player1, player2) => {
	let weightDif = 0;
	let weightAdv = 0;
	let expDif = 0;
	let expAdv = 0;

	if (setup.setHandicaps === true) {
		// if both players added/not imported
		if (player1.weight > 0 && player2.weight > 0) {
			weightDif = player1.weight - player2.weight;
			if (weightDif < 0) {
				weightDif *= -1;
				weightAdv = 1;
			}
			weightDif = Math.round((weightDif / setup.handicaps[0].amount));
			weightDif *= setup.handicaps[0].pts;

			expDif = ((player1.expYr * 12) + player1.expMonth) - ((player2.expYr * 12) + player2.expMonth);
			if (expDif < 0) {
				expDif *= -1;
				expAdv = 1;
			}
			expDif = Math.round((expDif / setup.handicaps[1].amount));
			expDif *= setup.handicaps[1].pts;
		} else {
			let handicapDiff = 0;
			if (player1.handicap < player2.handicap) {
				// p2 advantage
				handicapDiff = player2.handicap - player1.handicap;
				return player2.name + " has " + (usedPoints > 0 ? handicapDiff - usedPoints : handicapDiff) + " points to spend";
			} else {
				// p1 advantage
				handicapDiff = player1.handicap - player2.handicap;
				return player1.name + " has " + (usedPoints > 0 ? handicapDiff - usedPoints : handicapDiff) + " points to spend";
			}
		}
	}
	if (setup.setHandicaps === false) {
		return;
	}
	else {
		// if both players added/not imported
		if (player1.weight > 0 && player2.weight > 0) {
			if (weightAdv > 0 && expAdv > 0) {
				return player1.name + " has " + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + " points to spend";
			}
			if (weightAdv === 0 && expAdv === 0) {
				return player2.name + " has " + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + " points to spend";
			}
			if (expDif === weightDif && expAdv !== weightAdv) { // no advantage
				return "No one has points to spend!";
			}
			if (weightDif > expDif) {
				return expAdv === 1 ? player2.name + " has " + (usedPoints > 0 ? (weightDif - expDif) - usedPoints : weightDif - expDif) + " points to spend"
					: player1.name + " has " + (usedPoints > 0 ? (weightDif - expDif) - usedPoints : weightDif - expDif) + " points to spend";
			}
			if (expDif > weightDif) {
				return weightAdv === 1 ? player2.name + " has " + (usedPoints > 0 ? (expDif - weightDif) - usedPoints : expDif - weightDif) + " points to spend"
					: player1.name + " has " + (usedPoints > 0 ? (expDif - weightDif) - usedPoints : expDif - weightDif) + " points to spend";
			}
		} else {

		}
	}
}

export const PlayerSearchBox = ({ players, player, setPlayer, id, setup }) => {
	if (id !== undefined) {
		if (id > 0) {
			if (player !== null) {
				if (player.weight > 0 && setup !== undefined && setup !== null) {
					player = calcHandicap(player, setup);
				}
			}

			return (
				<Autocomplete
					id={("playersearch" + id)}
					options={players}
					getOptionLabel={(option) => option.name}
					// style={{ width: 300 }}
					value={player}
					onChange={(ev, newVal) => { setPlayer(newVal); }}
					renderInput={(params) => <TextField {...params} label={id === 1 ? "Player 1" : "Player 2"} variant="outlined" />}
				/>
			);
		} else {
			let playerArr = [];
			if (Object.keys(players).length > 0) {
				let temp = '';
				temp = players.p1.lName !== undefined && players.p1.lName.length > 0 ? players.p1.name + ' ' + players.p1.lName : players.p1.name;
				playerArr.push(temp);
				temp = players.p2.lName !== undefined && players.p2.lName.length > 0 ? players.p2.name + ' ' + players.p2.lName : players.p2.name;
				playerArr.push(temp);
			}

			return (
				<Autocomplete
					size="small"
					id={("playerselect")}
					options={playerArr}
					getOptionLabel={(option) => option}
					// style={{ width: 300 }}
					value={player}
					onChange={(ev, newVal) => { setPlayer(newVal); }}
					renderInput={(params) => <TextField {...params} label={"Winner"} variant="outlined" />}
				/>
			);
		}
	} else {
		return null;
	}
}

export const HandicapCheckList = ({ checkedInfo, night, penalties, formInfo }) => {
	const [handicaps, setHandicaps] = useState(formInfo);

	const handleChange = (event, penaltyIndex) => {
		let pts = parseInt(event.target.name.split(":")[1]);

		if (event.target.value === -1) {
			formInfo[penaltyIndex] = { "index": -1, "points": 0 };
		} else {
			formInfo[penaltyIndex] = { "index": parseInt(event.target.value), "points": pts };
		}
		setHandicaps(formInfo);
		return checkedInfo(formInfo);
	};

	const handleCheck = (event, penaltyIndex, categoryIndex) => {
		if (event.target.checked) {
			formInfo[penaltyIndex].push({
				index: categoryIndex,
				points: parseInt(event.target.name.split(":")[1])
			});
			return checkedInfo(formInfo);
		} else {
			let remain = formInfo[penaltyIndex].filter(({ index }) => index !== categoryIndex);
			formInfo[penaltyIndex] = remain;
			return checkedInfo(formInfo);
		}
	}

	const handleRandomCheck = (event, penaltyIndex) => {
		let randomIndex = Math.floor(Math.random() * penalties[penaltyIndex].length);
		let rng = penalties[penaltyIndex][randomIndex];

		if (event.target.checked) {
			if (penalties[penaltyIndex][randomIndex].random) {
				penalties[penaltyIndex][randomIndex].checked = true;
			}
			formInfo[penaltyIndex].index = randomIndex;
			formInfo[penaltyIndex].points = rng.pts;
			return checkedInfo(formInfo);
		} else {
			for (var i = 0; i < penalties[penaltyIndex].length; i++) {
				penalties[penaltyIndex][i].checked = false;
			}
			formInfo[penaltyIndex].index = -1;
			formInfo[penaltyIndex].points = 0;
			return checkedInfo(formInfo);
		}
	};

	return (
		<Box>
			{
				penalties.map((sub, index) => {
					return (
						<Box key={index}>
							<FormControl component="fieldset">
								<FormLabel key={index} focused={true} color={night ? "secondary" : "primary"} component="legend">{sub[0].type}</FormLabel>
								{sub[0].random ?
									<Box>
										<FormControlLabel
											control={
												<Checkbox
													onChange={(e) => { handleRandomCheck(e, index) }}
													name={"points:" + sub[index].pts}
													color={night ? "secondary" : "primary"}
												/>
											}
											label={"[" + sub[index].pts + "] " + ((sub.find(({ checked }) => checked === true) === undefined) ? "" : sub.find(({ checked }) => checked === true).desc)}
										/>
										{sub.map((p, i) => {
											return (
												<Box key={"p" + i}>{p.desc}</Box>
											)
										})}
									</Box>
									:
									(sub[0].limit > 1 || sub[0].limit < 0) ? // return checkbox if penalty not limited to 1
										sub.map((p, i) => {
											return (
												<Box key={i}>
													<FormControlLabel
														control={
															<Checkbox
																onChange={(e) => handleCheck(e, index, i)}
																name={"points:" + p.pts}
																color={night ? "secondary" : "primary"}
															/>
														}
														label={"[" + p.pts + "] " + p.desc}
													/>
												</Box>
											)
										})
										:
										<RadioGroup aria-label="" name="" defaultValue={-1} value={handicaps.length > 0 ? handicaps[index].index : -1} onChange={(e) => handleChange(e, index)}>
											<FormControlLabel key={-1} value={-1} control={<Radio />} label="None" />
											{sub.map((p, i) => {
												return (
													<FormControlLabel name={"p:" + sub[i].pts} key={i} value={i} control={<Radio />} label={"[" + sub[i].pts + "] " + sub[i].desc} />
												)
											})
											}
										</RadioGroup>
								}
							</FormControl>
						</Box>
					)
				})
			}
		</Box>
	);
}