import React, { useState, useEffect } from "react";
import { FormControlLabel, Button, Radio, RadioGroup, FormLabel, FormControl, Checkbox, Grid, Paper, Typography, Box } from "@material-ui/core";
import { regStyles } from "./styles/styles";
import { Menu } from "./menu/menu";
import { Setup } from "./setup";
import { Timer } from "./timer";

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

export const Sparring = ({night, user, logged, logout, updateUser}) => {
	const classes = regStyles({ night: night });
	const [setup, setSetup] = useState({
		isSet: false,
		mode: 0,
		setHandicaps: false,
		players: [],
		handicaps: [],
		listPenalties: [],
	});

	const [usedPoints, setUsedPoints] = useState(0);
	const [formInfo, setFormInfo] = useState([]);
	const [finished, setFinished] = useState(false);
	const [finalPenalties, setFinalPenalties] = useState([]);

	useEffect(() => {
		function init() {
			let info = [];
			if (setup.listPenalties.length > 0) {
				for (var i = 0; i < setup.listPenalties.length; i++) {
					if (setup.listPenalties[i][0].limit === 1) {
						info.push({ "index": -1, "points": 0 });
					} else {
						info.push([]);
					}
				}
			}
			setFormInfo(info);
		}
		if (finished === false) {
			init();
		}
	}, [setup.listPenalties, finished])

	const setupInfo = (info) => {
		setSetup({ ...setup, info });
	}

	function calcHandicap() {
		let weightDif = 0;
		let expDif = 0;
		let weightAdv = 0;
		let expAdv = 0;
		if (setup.mode === 0) { // sparring mode
			if (setup.players.length >= 2) {
				if (setup.setHandicaps === true) {
					weightDif = setup.players[0].weight - setup.players[1].weight;
					if (weightDif < 0) {
						weightDif *= -1;
						weightAdv = 1;
					}
					weightDif = Math.round((weightDif / setup.handicaps[0].amount));
					weightDif *= setup.handicaps[0].pts;

					expDif = ((setup.players[0].expYr * 12) + setup.players[0].expMonth) - ((setup.players[1].expYr * 12) + setup.players[1].expMonth);
					if (expDif < 0) {
						expDif *= -1;
						expAdv = 1;
					}
					expDif = Math.round((expDif / setup.handicaps[1].amount));
					expDif *= setup.handicaps[1].pts;
				}
				if (setup.setHandicaps === false) {
					return;
				}
				else {
					if (weightAdv > 0 && expAdv > 0) {
						return setup.players[0].name + " has " + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + " points to spend";
					}
					if (weightAdv === 0 && expAdv === 0) {
						return setup.players[1].name + " has " + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + " points to spend";
					}
					if (expDif === weightDif && expAdv !== weightAdv) { // no advantage
						return "No one has points to spend!";
					}
					if (weightDif > expDif) {
						return setup.players[expAdv].name + " has " + (usedPoints > 0 ? (weightDif - expDif) - usedPoints : weightDif - expDif) + " points to spend";
					}
					if (expDif > weightDif) {
						return setup.players[weightAdv].name + " has " + (usedPoints > 0 ? (expDif - weightDif) - usedPoints : expDif - weightDif) + " points to spend";
					}
				}
			}
			return null;
		}
	}

	function checkedInfo(info) {
		let total = 0;

		for (var i = 0; i < info.length; i++) {
			if (info[i].length !== undefined) { // for multiple checkboxes
				for (var k = 0; k < info[i].length; k++) {
					total += info[i][k].points;
				}
			}

			if (!isNaN(info[i].points)) {
				total += info[i].points;
			}
		}

		setFormInfo(info);
		setUsedPoints(total);
	}

	function finishedPenalties() {
		let p = [];
		for (var i = 0; i < formInfo.length; i++) {
			if (formInfo[i].length !== undefined) { // for multiple checkboxes
				for (var k = 0; k < formInfo[i].length; k++) {
					p.push(setup.listPenalties[i][k].desc);
				}
			} else {
				if (formInfo[i].index >= 0) {
					p.push(setup.listPenalties[i][formInfo[i].index].desc);
				}
			}
		}
		setFinished(true);
		setFinalPenalties(p);
	}

	function resetPenalties() {
		setFinalPenalties([]);
		setFormInfo([]);
		setUsedPoints(0);
		setFinished(false);
	}

	return (
		<Box width="90vw">
			{!setup.isSet ?
				<Setup updateUser={updateUser} setupInfo={setupInfo} setup={setup} night={night} logged={logged} user={user} logout={logout}/>
				:
				<Grid container spacing={3} direction="row" justify="space-between" alignItems="flex-start">
					<Grid item xs={12} md={setup.setHandicaps === true ? 9 : 12}>
						<Box display="flex" flexDirection="column">
							<Box mb={2}>
								<Paper className={classes.paper}>
									<Timer night={night} only={false} />
								</Paper>
							</Box>
							{setup.players.length >= 2 &&
								<Box>
									<Paper className={classes.paper}>
										<Box>
											<Box display="flex" flexDirection="row" justifyContent="center" whiteSpace="space-around">
												<Box flexGrow="1">
													<Typography variant="h5">{setup.players[0].name}</Typography>
												</Box>
												<Box>
													<Typography variant="h5">vs</Typography>
												</Box>
												<Box flexGrow="1">
													<Typography variant="h5">{setup.players[1].name}</Typography>
												</Box>
											</Box>
										</Box>
									</Paper>
								</Box>
							}
						</Box>
					</Grid>
					{
						setup.setHandicaps &&
						<Grid item xs={12} md={3}>
							<Box>
								<Paper className={classes.paperHandicap}>
									<Typography variant="h5">Handicaps</Typography>
									<Box flexGrow="1" mb={1}>{() => calcHandicap()}</Box>
									{finished ?
										<Box>
											{finalPenalties.map((penalty, index) => { return (<Box key={index} mb={1}>{penalty}</Box>) })}
											<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => resetPenalties()}>Reset</Button>
										</Box>
										:
										<Box>
											<HandicapCheckList formInfo={formInfo} checkedInfo={checkedInfo} night={night} penalties={setup.listPenalties} />
											<Box mt={1}>
												<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => finishedPenalties()}>Finalize</Button>
											</Box>
										</Box>
									}
								</Paper>
							</Box>
						</Grid>
					}
					<Grid item xs={12}>
						{/* <Menu night={props.night} logged={props.logged} /> */}
						<Menu logged={logged} night={night} logout={logout}/>
					</Grid>
				</Grid>
			}
		</Box>
	);
}
