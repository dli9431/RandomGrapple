import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, Box } from "@material-ui/core";
import { regStyles } from "./styles/styles";
import { Menu } from "./menu/menu";
import { Setup } from "./setup";
import { Timer } from "./timer";
import { HandicapCheckList, calcHandicapText, PlayerSearchBox } from "./setup/setupPage";

export const Sparring = ({ night, user, logged, logout, updateUser }) => {
	const classes = regStyles({ night: night });
	const [setup, setSetup] = useState({
		isSet: false,
		mode: 0,
		setHandicaps: false,
		players: [],
		handicaps: [],
		listPenalties: [],
		gymAvg: {}
	});

	const [usedPoints, setUsedPoints] = useState(0);
	const [formInfo, setFormInfo] = useState([]);
	const [finished, setFinished] = useState(false);
	const [finalPenalties, setFinalPenalties] = useState([]);
	const [player1, setPlayer1] = useState(null);
	const [player2, setPlayer2] = useState(null);

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
		// let weightDif = 0;
		// let expDif = 0;
		// let weightAdv = 0;
		// let expAdv = 0;

		if (setup.mode === 0) { // sparring mode
			if (setup.players.length >= 2) {
				if (Object.keys(setup.gymAvg).length > 0) {
					const txt = calcHandicapText(setup, usedPoints, 0, 0, 0, 0, setup.gymAvg.weight, setup.gymAvg.exp);
					return txt;
				} else {
					const txt = calcHandicapText(setup, usedPoints, 0, 0, 0, 0, -1, -1);
					return txt;
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
				<Setup updateUser={updateUser} setupInfo={setupInfo} setup={setup} night={night} logged={logged} user={user} logout={logout} />
				:
				<Grid container spacing={3} direction="row" justify="space-between" alignItems="flex-start">
					<Grid item xs={12} md={setup.setHandicaps === true ? 9 : 12}>
						<Box display="flex" flexDirection="column">
							<Box mb={2}>
								<Paper className={classes.paper}>
									<Timer night={night} only={false} />
								</Paper>
							</Box>
							<Box>
								<Paper className={classes.paper}>
									<Grid container direction="row" alignItems="flex-start">
										<Grid item xs={12} sm={6} md={4}>
											<Box p={1}>
												<PlayerSearchBox players={setup.players} player={player1} setPlayer={setPlayer1} id={1} />
											</Box>
										</Grid>
										{(player1 !== undefined && player1 !== null) &&
											<Grid item xs={12} sm={6} md={8}>
												<Box p={1} textAlign="left">
													<Typography variant="h5">
														{(player1 !== undefined && player1 !== null) && <span>{player1.name} </span>}
														{((player1 !== undefined && player1 !== null) && player1.nickname.length > 0) && <span> "{player1.nickname}" </span>}
														{((player1 !== undefined && player1 !== null) && player1.lName !== undefined && player1.lName.length > 0) && <span> {player1.lName} </span>}
													</Typography>
													<Typography variant="body1">
														{(player1 !== undefined && player1 !== null) && <span>Handicap: {player1.handicap} | </span>}
														{(player1 !== undefined && player1 !== null) && <span>Record: {player1.record} </span>}
													</Typography>
												</Box>
												<Box textAlign="right">
													<Typography variant="h3">VS</Typography>
												</Box>
											</Grid>
										}
										<Grid item xs={12} sm={6} md={4}>
											<Box p={1}>
												<PlayerSearchBox players={setup.players} player={player2} setPlayer={setPlayer2} id={2} />
											</Box>
										</Grid>
										{(player2 !== undefined && player2 !== null) &&
											<Grid item xs={12} sm={6} md={8}>
												<Box p={1} textAlign="left">
													<Typography variant="h5">
														{(player2 !== undefined && player2 !== null) && <span>{player2.name} </span>}
														{((player2 !== undefined && player2 !== null) && player2.nickname.length > 0) && <span> "{player2.nickname}" </span>}
														{((player2 !== undefined && player2 !== null) && player2.lName !== undefined && player2.lName.length > 0) && <span> {player2.lName} </span>}
													</Typography>
													<Typography variant="body1">
														{(player2 !== undefined && player2 !== null) && <span>Handicap: {player2.handicap} | </span>}
														{(player2 !== undefined && player2 !== null) && <span>Record: {player2.record} </span>}
													</Typography>
												</Box>
											</Grid>
										}
									</Grid>
								</Paper>
							</Box>
							{/* {setup.players.length >= 2 &&
								<Box>
									<Paper className={classes.paper}>
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
									</Paper>
								</Box>
							} */}
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
						<Menu logged={logged} night={night} logout={logout} />
					</Grid>
				</Grid>
			}
		</Box>
	);
}
