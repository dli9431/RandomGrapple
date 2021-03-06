import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, Box } from "@material-ui/core";
import { regStyles } from "./styles/styles";
import { ButtonMenu } from "./menu/menu";
import { Setup } from "./setup";
import { Timer } from "./timer";
import { defaultMatch, CalcHandicap, HandicapCheckList, PlayerSearchBox } from "./setup/setupPage";
import { saveMatch } from "./auth/sheets";

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
	const [match, setMatch] = useState(defaultMatch);
	const [usedPoints, setUsedPoints] = useState(0);
	const [formInfo, setFormInfo] = useState([]);
	const [finished, setFinished] = useState(false);
	const [finalPenalties, setFinalPenalties] = useState([]);
	const [player1, setPlayer1] = useState(null);
	const [player2, setPlayer2] = useState(null);
	const [save, setSave] = useState(false);
	const [resetTimer, setResetTimer] = useState(false);

	useEffect(() => {
		function init() {
			let info = [];
			let temp = [];
			if (setup.listPenalties.length > 0) {
				for (var i = 0; i < setup.listPenalties.length; i++) {
					if (setup.listPenalties[i][0].limit === 1) {
						info.push({ catIndex: i, selIndex: -1, points: 0 });
					} else {
						info.push(temp);
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

	const matchInfo = (info, save) => {
		setMatch(info);
		// save to sheets
		if (user.spreadsheetId !== undefined && user.spreadsheetId.length > 0) {
			setSave(true);
		}
	}

	function checkedInfo(info) {
		let total = 0;

		for (var i = 0; i < info.length; i++) {
			if (info[i] === null || info[i] === undefined) {
				continue;
			}

			if (info[i].length !== undefined) { // for multiple checkboxes
				if (info[i].length > 0) {
					for (var k = 0; k < info[i].length; k++) {
						total += info[i][k].points;
					}
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
			if (formInfo[i] === undefined || formInfo[i] === null) {
				continue;
			} else {
				if (formInfo[i].length > 0) { // multicheckbox
					for (var k = 0; k < formInfo[i].length; k++) {
						p.push(setup.listPenalties[formInfo[i][k].catIndex][formInfo[i][k].checkedIndex].desc);
					}
				} else {
					if (formInfo[i].selIndex >= 0) {
						p.push(setup.listPenalties[formInfo[i].catIndex][formInfo[i].selIndex].desc);
					}
				}
			}
		}
		setFinished(true);
		setFinalPenalties(p);
		match.penalties = p;
	}

	function resetPenalties() {
		setFinalPenalties([]);
		setFormInfo([]);
		setUsedPoints(0);
		setFinished(false);
	}

	function fullReset(r) {
		if (r) {
			setResetTimer(true);
			setMatch(defaultMatch);
			resetPenalties();
			setSave(false);
		}
	}

	const saveMatchBtn = async () => {
		let rows = await saveMatch(user, match, setup.mode, setup.matches.current);
		setup.matches.current += rows;
		setSetup(setup);
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
									<Timer resetTimer={resetTimer} night={night} only={false} player1={player1} player2={player2} match={match} matchInfo={matchInfo} />
									{save && <Box mt={1}><Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => saveMatchBtn()}>Save Match</Button></Box>}
								</Paper>
							</Box>
							<Box>
								<Paper className={classes.paper}>
									<Grid container direction="row" alignItems="flex-start">
										<Grid item xs={12} sm={6} md={4}>
											<Box p={1}>
												<PlayerSearchBox fullReset={fullReset} players={setup.players} player={player1} setPlayer={setPlayer1} id={1} gymAvg={setup.gymAvg} handicaps={setup.handicaps} />
											</Box>
										</Grid>
										{(player1 !== undefined && player1 !== null) &&
											<Grid item xs={12} sm={6} md={8}>
												<Box p={1} textAlign="left">
													<Typography variant="h5">
														{(player1 !== undefined && player1 !== null) && <span>{player1.name} </span>}
														{((player1 !== undefined && player1 !== null) && (player1.nickname !== undefined && player1.nickname.length > 0)) && <span> "{player1.nickname}" </span>}
														{((player1 !== undefined && player1 !== null) && (player1.lName !== undefined && player1.lName !== undefined && player1.lName.length > 0)) && <span> {player1.lName} </span>}
													</Typography>
													<Typography variant="body1">
														{((player1 !== undefined && player1 !== null) && (player1.handicap !== null && player1.handicap !== undefined) && (!isNaN(player1.handicap))) && <span>Handicap: {player1.handicap}</span>}
														{((player1 !== undefined && player1 !== null) && (player1.record !== null && player1.record !== undefined) && (player1.record.length > 0)) && <span> | Record: {player1.record} </span>}
													</Typography>
												</Box>
												<Box textAlign="right">
													<Typography variant="h3">VS</Typography>
												</Box>
											</Grid>
										}
										<Grid item xs={12} sm={6} md={4}>
											<Box p={1}>
												<PlayerSearchBox fullReset={fullReset} players={setup.players} player={player2} setPlayer={setPlayer2} id={2} gymAvg={setup.gymAvg} handicaps={setup.handicaps} />
											</Box>
										</Grid>
										{(player2 !== undefined && player2 !== null) &&
											<Grid item xs={12} sm={6} md={8}>
												<Box p={1} textAlign="left">
													<Typography variant="h5">
														{(player2 !== undefined && player2 !== null) && <span>{player2.name} </span>}
														{((player2 !== undefined && player2 !== null) && (player2.nickname !== undefined && player2.nickname.length > 0)) && <span> "{player2.nickname}" </span>}
														{((player2 !== undefined && player2 !== null) && (player2.lName !== undefined && player2.lName !== undefined && player2.lName.length > 0)) && <span> {player2.lName} </span>}
													</Typography>
													<Typography variant="body1">
														{((player2 !== undefined && player2 !== null) && (player2.handicap !== null && player2.handicap !== undefined) && (!isNaN(player2.handicap))) && <span>Handicap: {player2.handicap}</span>}
														{((player2 !== undefined && player2 !== null) && (player2.record !== null && player2.record !== undefined) && (player2.record.length > 0)) && <span> | Record: {player2.record} </span>}
													</Typography>
												</Box>
											</Grid>
										}
									</Grid>
								</Paper>
							</Box>
						</Box>
					</Grid>
					{
						setup.setHandicaps &&
						<Grid item xs={12} md={3}>
							<Box>
								<Paper className={classes.paperHandicap}>
									<Typography variant="h5">Handicaps</Typography>
									<Box flexGrow="1" mb={1}>
										<CalcHandicap gymAvg={setup.gymAvg} handicaps={setup.handicaps} usedPoints={usedPoints} player1={player1} player2={player2} />
									</Box>
									{finished ?
										<Box>
											{finalPenalties.map((penalty, index) => { return (<Box key={index} mb={1}>{penalty}</Box>) })}
											<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => resetPenalties()}>Reset</Button>
										</Box>
										:
										<Box>
											{setup.listPenalties.length > 0 &&
												setup.listPenalties.map((penalty, index) => {
													return (<HandicapCheckList
														formInfo={formInfo}
														checkedInfo={checkedInfo}
														night={night}
														penalty={penalty}
														index={index}
														key={index}
													/>);
												})}
											{/* <HandicapCheckList formInfo={formInfo} checkedInfo={checkedInfo} night={night} penalties={setup.listPenalties} /> */}
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
						<ButtonMenu logged={logged} night={night} logout={logout} />
					</Grid>
				</Grid>
			}
		</Box>
	);
}
