import React, { useEffect, useState } from "react";
import { TextField, Typography, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Checkbox, Box } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export const defaultMatch = {
	players: {
		p1: {},
		p2: {}
	},
	winner: '',
	winMethod: '',
	initTime: 0, // time in seconds
	endTime: 0, // match end time
	p1Score: {},
	p2Score: {},
	penalties: [],
	handicapDiff: 0
}

export const calcHandicap = (player, gymAvg, handicaps) => {
	let weightHandicap = ((player.weight - gymAvg.weight) / handicaps[0].amount) * handicaps[0].pts;
	let expHandicap = (((player.expYr * 12 + player.expMonth) - gymAvg.exp) / handicaps[1].amount) * handicaps[1].pts;
	weightHandicap *= -1;
	expHandicap *= -1;
	let handicap = Math.round(weightHandicap + expHandicap);
	player.handicap = handicap;
	return player;
}

export const CalcHandicap = ({ gymAvg, handicaps, usedPoints, player1, player2 }) => {
	// user imported sheet, can mix/match handicaps
	if (Object.keys(gymAvg).length > 0) {
		if (player1 !== null && player2 !== null) {
			if (player1.weight > 0 || player2.weight > 0) {
				// compare to gym avg
				if (player1.weight > 0) {
					// calc points vs avg
					player1 = calcHandicap(player1, gymAvg, handicaps);
				}
				if (player2.weight > 0) {
					player2 = calcHandicap(player2, gymAvg, handicaps);
				}
			}
			let text = calcHandicapText(handicaps, usedPoints, player1, player2);
			return text;
		}
	} else {
		// only calculate based on entered weight/xp
		if (player1 !== null && player2 !== null) {
			let text = calcHandicapText(handicaps, usedPoints, player1, player2);
			return text;
		}
	}

	return null;
}

export const calcHandicapText = (handicaps, usedPoints, player1, player2) => {
	let weightDif = 0;
	let weightAdv = 0;
	let expDif = 0;
	let expAdv = 0;

	// if both players added/not imported
	if (player1.weight > 0 && player2.weight > 0) {
		weightDif = player1.weight - player2.weight;
		if (weightDif < 0) {
			weightDif *= -1;
			weightAdv = 1;
		}
		weightDif = Math.round((weightDif / handicaps[0].amount));
		weightDif *= handicaps[0].pts;

		expDif = ((player1.expYr * 12) + player1.expMonth) - ((player2.expYr * 12) + player2.expMonth);
		if (expDif < 0) {
			expDif *= -1;
			expAdv = 1;
		}
		expDif = Math.round((expDif / handicaps[1].amount));
		expDif *= handicaps[1].pts;
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
	}
}

export const PlayerSearchBox = ({ fullReset, players, player, setPlayer, id, gymAvg, handicaps }) => {
	if (id !== undefined) {
		if (id > 0) {
			if (player !== null) {
				if (player.weight > 0 && gymAvg !== undefined && handicaps !== undefined) {
					player = calcHandicap(player, gymAvg, handicaps);
				}
			}

			return (
				<Autocomplete
					id={("playersearch" + id)}
					options={players}
					getOptionLabel={(option) => option.name}
					// style={{ width: 300 }}
					value={player}
					onChange={(ev, newVal) => { setPlayer(newVal); fullReset(true); }}
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

export const HandicapCheckList = ({ checkedInfo, night, penalty, formInfo, index }) => {
	const [radioValue, setRadioValue] = useState(-1);
	const [randomed, setRandomed] = useState(null);

	const handleChange = (event) => {
		let pts = parseInt(event.target.name.split(":")[1]);
		if (event.target.value === -1) {
			formInfo[index] = { catIndex: index, selIndex: -1, points: 0 };
		} else {
			formInfo[index] = { catIndex: index, selIndex: parseInt(event.target.value), points: pts };
		}
		setRadioValue(parseInt(event.target.value));
		return checkedInfo(formInfo);
	};

	const handleCheck = (event, checked) => {
		if (event.target.checked) {
			if (formInfo[index] === undefined) {
				formInfo[index] = [];
			}
			
			if (formInfo[index].length > 0) {
				formInfo[index].push({
					catIndex: index,
					checkedIndex: checked,
					points: parseInt(event.target.name.split(":")[1])
				});
			} else {
				let temp = [];
				temp.push({
					catIndex: index,
					checkedIndex: checked,
					points: parseInt(event.target.name.split(":")[1])
				})
				formInfo[index] = temp;
			}
		} else {
			let remain = formInfo[index].filter(({ checkedIndex }) => checkedIndex !== checked);
			formInfo[index] = remain;
		}
		return checkedInfo(formInfo);
	}

	const handleRandomCheck = (event, penaltyIndex) => {
		let randomIndex = Math.floor(Math.random() * penalty.length);

		if (event.target.checked) {
			penalty[randomIndex].checked = true;
			setRandomed(penalty[randomIndex]);
			formInfo[index] = { catIndex: index, selIndex: randomIndex, points: penalty[randomIndex].pts };
		} else {
			setRandomed(null);
			formInfo[index] = { catIndex: index, selIndex: -1, points: 0 };
		}
		return checkedInfo(formInfo);
	};

	const first = penalty[0];
	if (first.random === true && penalty.length > 0) {
		return (
			<Box key={index}>
				<Typography color={night ? "secondary" : "primary"}>{first.type} (Random)</Typography>
				<FormControl>
					<FormControlLabel
						control={
							<Checkbox
								onChange={(e) => { handleRandomCheck(e) }}
								name={"points:" + first.pts}
								color={night ? "secondary" : "primary"}
							/>
						}
						label={"[" + first.pts + "] " + (randomed !== null ? randomed.desc : "")}
					/>
				</FormControl>
				{penalty.map((sub, i) => {
					return (
						<Box key={i} display="flex" flexDirection="row" mt={1} mb={1}>
							<Box>{sub.desc}</Box>
						</Box>
					);
				})}
				<hr />
			</Box>
		);
	} else {
		if (first.limit === 1 && penalty.length > 0) {
			return (
				<Box key={index}>
					<Typography color={night ? "secondary" : "primary"}>{first.type}</Typography>
					<FormControl>
						<RadioGroup aria-label="" name="" value={radioValue} onChange={(e) => handleChange(e)}>
							<FormControlLabel key={-1} value={-1} control={<Radio />} label="None" />
							{penalty.map((sub, i) => {
								return (
									<FormControlLabel name={"p:" + sub.pts} key={i} value={i} control={<Radio />} label={"[" + sub.pts + "] " + sub.desc} />
								);
							})}
						</RadioGroup>
					</FormControl>
					<hr />
				</Box>
			);
		} else {
			return (
				<Box key={index}>
					<Typography color={night ? "secondary" : "primary"}>{first.type}</Typography>
					<FormControl>
						{penalty.map((p, i) => {
							return (
								<Box key={i}>
									<FormControlLabel
										control={
											<Checkbox
												onChange={(e) => handleCheck(e, i)}
												name={"points:" + p.pts}
												color={night ? "secondary" : "primary"}
											/>
										}
										label={"[" + p.pts + "] " + p.desc}
									/>
								</Box>
							)
						})}
					</FormControl>
				</Box>
			);
		}
	}
}