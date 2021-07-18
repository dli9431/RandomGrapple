import React, { useState } from "react";
import { TextField, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Checkbox, Box } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

///TODO: update this function so it works with player select
export const calcHandicapText = (setup, usedPoints, player1, player2, gymAvgWeight, gymAvgExp) => {
	// console.log(weightDif + " " + weightAdv + " " + expDif + " " + expAdv + " " + gymAvgWeight + " " + gymAvgExp);
	// console.log(setup);
	if (setup.mode === 0) {

	} else {

	}
	return null;
	// if (setup.setHandicaps === true) {
	// 	weightDif = setup.players[0].weight - setup.players[1].weight;
	// 	if (weightDif < 0) {
	// 		weightDif *= -1;
	// 		weightAdv = 1;
	// 	}
	// 	weightDif = Math.round((weightDif / setup.handicaps[0].amount));
	// 	weightDif *= setup.handicaps[0].pts;

	// 	expDif = ((setup.players[0].expYr * 12) + setup.players[0].expMonth) - ((setup.players[1].expYr * 12) + setup.players[1].expMonth);
	// 	if (expDif < 0) {
	// 		expDif *= -1;
	// 		expAdv = 1;
	// 	}
	// 	expDif = Math.round((expDif / setup.handicaps[1].amount));
	// 	expDif *= setup.handicaps[1].pts;
	// }
	// if (setup.setHandicaps === false) {
	// 	return;
	// }
	// else {
	// 	if (weightAdv > 0 && expAdv > 0) {
	// 		return setup.players[0].name + " has " + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + " points to spend";
	// 	}
	// 	if (weightAdv === 0 && expAdv === 0) {
	// 		return setup.players[1].name + " has " + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + " points to spend";
	// 	}
	// 	if (expDif === weightDif && expAdv !== weightAdv) { // no advantage
	// 		return "No one has points to spend!";
	// 	}
	// 	if (weightDif > expDif) {
	// 		return setup.players[expAdv].name + " has " + (usedPoints > 0 ? (weightDif - expDif) - usedPoints : weightDif - expDif) + " points to spend";
	// 	}
	// 	if (expDif > weightDif) {
	// 		return setup.players[weightAdv].name + " has " + (usedPoints > 0 ? (expDif - weightDif) - usedPoints : expDif - weightDif) + " points to spend";
	// 	}
	// }
}

export const PlayerSearchBox = ({ players, player, setPlayer, id }) => {
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