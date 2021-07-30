import React, { useEffect, useState } from 'react';
import { Router, Link as ReachLink } from '@reach/router';
import { Link, IconButton, Grid, Paper, Button, TextField, Typography, Box, } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { ButtonMenu } from './menu/menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { defaultHandicaps, defaultPenalties } from './setup/setupVars';
import { Category } from './setup/category';
import { readSheet, createSheet, savePlayers } from './auth/sheets';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RemoveIcon from '@material-ui/icons/Remove';

const readSheetBtn = async (setupInfo, setImported, user, setup, setError) => {
	let reSetup = await readSheet(user, setup);
	if (reSetup.length > 0) {
		setImported(false);
		setError(reSetup);
	} else {
		setupInfo(reSetup);
		setImported(true);
	}
}

const InitialScreen = ({ setup, setupInfo, updateUser, user, logged, night }) => {
	return (
		<Box>
			{
				logged ?
					<Box>
						{user.spreadsheetId !== undefined && user.spreadsheetId.length > 0 ?
							<Box>
								{/* <Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => readSheetBtn()}>Import</Button> */}
								Your spreadsheet: <Link color={night ? "secondary" : "primary"} href={'https://docs.google.com/spreadsheets/d/' + user.spreadsheetId} rel="noreferrer" target="_blank">{user.spreadsheetId}</Link>
							</Box>
							:
							<Box>
								You don't currently have a spreadsheet to import from.
								<Box mt={1}>
									<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => createSheet(updateUser)}>Create</Button>
								</Box>
							</Box>
						}
						{/* {imported ?
							<Box>Spreadsheet: {user.spreadsheetId} imported!</Box> : ''
						} */}
					</Box>
					:
					<Box>
						<Typography color="error">You currently are not logged in - match data will not be saved!</Typography>
						<Typography>
							<Link href="/api/auth/google" color={night ? "secondary" : "primary"}>
								Login
							</Link> to import custom settings and save match history.
						</Typography>
					</Box>
			}
			<Box mt={2}>

				{
					setup.mode > 0 ?
						<ReachLink to="mode" style={{ textDecoration: 'none' }}>
							<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
						</ReachLink>
						:
						<ReachLink to="handicaps" style={{ textDecoration: 'none' }}>
							<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
						</ReachLink>
				}
			</Box>
		</Box>
	);
}

const TournamentScreen = ({ night, setup, setupInfo, user, classes }) => {
	function modeSelect(version) {
		setup.mode = version;
		setupInfo(setup);
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<Box p={2} border={1} borderColor={night ? "secondary" : "primary"}>
					<Typography variant="h5">Quintet</Typography>
					Form teams and battle it out "King of the Hill" style
					<Box mt={2}>
						<ReachLink to="../info" style={{ textDecoration: 'none' }}>
							<Button size="large" onClick={() => modeSelect(1)} color={night ? "secondary" : "primary"} variant="contained">Select</Button>
						</ReachLink>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box p={2} border={1} borderColor={night ? "secondary" : "primary"}>
					<Typography variant="h5">Single Elimination</Typography>
					Standard single elimination with automated brackets
					<Box mt={2}>
						<Button disabled={true} size="large" onClick={() => modeSelect(2)} color={night ? "secondary" : "primary"} variant="contained">Coming soon</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

const TournamentInfoScreen = ({ night, setup, setupInfo, user, classes }) => {
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');

	if (setup.mode > 0) {
		if (setup.mode > 1) {
			setup.tournamentInfo = {};
			setup.tournamentInfo.mode = 'Single Elimination';
		} else {
			setup.tournamentInfo = {};
			setup.tournamentInfo.mode = 'Quintet';
		}
	}

	function info() {
		setup.tournamentInfo.title = title;
		setup.tournamentInfo.location = location;
		setup.tournamentInfo.date = new Date();
		setupInfo(setup);
	}

	return (
		<Box>
			<Typography variant="h5">Info</Typography>
			<Box mb={2} display="flex" flexDirection="column" justifyContent="center">
				<Box>
					<TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Tournament Name" variant="outlined" />
				</Box>
				<Box mt={1}>
					<TextField value={location} onChange={(e) => { setLocation(e.target.value) }} label="Location" variant="outlined" />
				</Box>
			</Box>
			<Box mt={2} display="flex" flexDirection="row" justifyContent="center">
				<Box pr={1}>
					<ReachLink to="../mode" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained">Back</Button>
					</ReachLink>
				</Box>
				<Box>
					<ReachLink to="../handicaps" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained" onClick={() => info()}>Next</Button>
					</ReachLink>
				</Box>
			</Box>
		</Box>
	);
}

const HandicapPointsScreen = ({ night, setup, setupInfo, user, classes }) => {
	const [imported, setImported] = useState(false);

	// handicap pts
	const [handicaps, setHandicaps] = useState(false);
	const [handicapWeight, setHandicapWeight] = useState(0);
	const [handicapWeightPts, setHandicapWeightPts] = useState(0);
	const [handicapExp, setHandicapExp] = useState(0);
	const [handicapExpPts, setHandicapExpPts] = useState(0);
	const [error, setError] = useState('');

	useEffect(() => {
		if (setup.handicaps !== undefined && setup.handicaps.length > 0) {
			setHandicapWeight(setup.handicaps[0].amount);
			setHandicapWeightPts(setup.handicaps[0].pts);
			setHandicapExp(setup.handicaps[1].amount);
			setHandicapExpPts(setup.handicaps[1].pts);
			setHandicaps(true);
		}
	}, [setup.handicaps]);

	function addHandicap() {
		setup.handicaps = [];
		setup.handicaps.push({
			name: "Weight Handicap",
			unit: 'lbs',
			amount: parseInt(handicapWeight),
			pts: parseInt(handicapWeightPts)
		});
		setup.handicaps.push({
			name: "Experience Handicap",
			unit: 'months',
			amount: parseInt(handicapExp),
			pts: parseInt(handicapExpPts)
		});
		setHandicaps(true);
		setup.setHandicaps = true;
	}
	function add0Handicap() {
		setHandicapExp(0);
		setHandicapExpPts(0);
		setHandicapWeightPts(0);
		setHandicapWeight(0);

		setup.handicaps = [];
		setup.handicaps.push({
			name: "Weight Handicap",
			amount: 0,
			pts: 0,
			unit: 'lbs'
		});
		setup.handicaps.push({
			name: "Experience Handicap",
			amount: 0,
			pts: 0,
			unit: 'months'
		});
		setHandicaps(true);
		setup.setHandicaps = false;
	}

	function importDefaultHandicap() {
		setError('');
		setHandicapWeight(20);
		setHandicapWeightPts(1);
		setHandicapExp(3);
		setHandicapExpPts(1);
		setup.handicaps = [];
		setup.handicaps = defaultHandicaps;
		setup.setHandicaps = true;
	}

	function resetHandicap() {
		setError('');
		setup.handicaps = [];
		setHandicaps(false);
		setup.setHandicaps = false;
		setHandicapWeight(0);
		setHandicapWeightPts(0);
		setHandicapExp(0);
		setHandicapExpPts(0);
		setImported(false);
	}

	return (
		<Box>
			<Typography variant="h5">Handicap Points</Typography>
			<Grid container direction="row" justify="center">
				{imported && <Grid item xs={12}><Box mt={1}>Spreadsheet handicap settings imported!</Box></Grid>}
				{error.length > 0 && <Grid item xs={12}><Box mt={1}>{error}</Box></Grid>}
				{handicaps === false ?
					<>
						<Grid item xs={12}>
							<Box mt={2} mb={3} display="flex" flexDirection="row" justifyContent="center">
								<Box>
									<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => readSheetBtn(setupInfo, setImported, user, setup, setError)}>Import</Button>
								</Box>
								<Box pl={1}>
									<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => importDefaultHandicap()}>Default</Button>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={8} sm={6} md={3} lg={2}>
							<TextField type="number" step="10" value={handicapWeight} onChange={(e) => { setHandicapWeight(e.target.value) }} label="Weight (lbs)" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={4} sm={6} md={1} lg={2}>
							<TextField type="number" step="1" value={handicapWeightPts} onChange={(e) => { setHandicapWeightPts(e.target.value) }} label="Points" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={8} sm={6} md={3} lg={2}>
							<TextField type="number" step="1" value={handicapExp} onChange={(e) => { setHandicapExp(e.target.value) }} label="Exp (months)" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={4} sm={6} md={1} lg={2}>
							<TextField type="number" step="1" value={handicapExpPts} onChange={(e) => { setHandicapExpPts(e.target.value) }} label="Points" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={6} sm={2} md={2} lg={2}>
							<Button onClick={() => addHandicap()} fullWidth={true} variant="outlined" size="small" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
						</Grid>
						<Grid item xs={6} sm={2} md={2} lg={2}>
							<Button onClick={() => add0Handicap()} fullWidth={true} variant="outlined" size="small" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">No Handicap</Button>
						</Grid>
					</>
					:
					<>
						<Grid item xs={12}>
							<Box mb={1}>
								{Object.keys(setup.handicaps).map(function (key, index) { return <Box key={index}>{setup.handicaps[key].name + ": " + setup.handicaps[key].amount + " " + setup.handicaps[key].unit + " / " + setup.handicaps[key].pts + " pts"}</Box> })}
							</Box>
						</Grid>
						<Grid item xs={6} sm={2} md={2} lg={2}>
							<Button fullWidth={true} onClick={() => resetHandicap()} variant="contained" color={night ? "secondary" : "primary"} width="100%">Reset</Button>
						</Grid>
					</>
				}
			</Grid>
			<Box mt={2} display="flex" flexDirection="row" justifyContent="center">
				<Box pr={1}>
					{
						setup.mode === 0 ?
							<ReachLink to="../" style={{ textDecoration: 'none' }}>
								<Button color={night ? "secondary" : "primary"} variant="contained">Back</Button>
							</ReachLink>
							:
							<ReachLink to="../info" style={{ textDecoration: 'none' }}>
								<Button color={night ? "secondary" : "primary"} variant="contained">Back</Button>
							</ReachLink>
					}
				</Box>
				<Box>
					<ReachLink to="../players" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
					</ReachLink>
				</Box>
			</Box>
		</Box>
	)
}

const PlayerScreen = ({ setup, night, user, setupInfo, renderList, setRenderList, classes }) => {
	// player info
	const [playerWeight, setPlayerWeight] = useState(0);
	const [playerName, setPlayerName] = useState('');
	const [playerNickname, setPlayerNickname] = useState('');
	const [playerExpYr, setPlayerExpYr] = useState(0);
	const [playerExpMonth, setPlayerExpMonth] = useState(0);
	const [saved, setSaved] = useState(false);
	const [imported, setImported] = useState(false);
	const [error, setError] = useState('');

	function addPlayer() {
		setup.players.push({
			name: playerName.split(" ").length > 0 ? playerName.split(" ")[0] : playerName,
			lName: playerName.split(" ").length > 0 ? playerName.split(" ")[1] : '',
			nickname: playerNickname,
			weight: parseInt(playerWeight),
			expYr: parseInt(playerExpYr),
			expMonth: parseInt(playerExpMonth)
		});
		// reset form
		setPlayerName('');
		setPlayerNickname('');
		setPlayerWeight(0);
		setPlayerExpYr(0);
		setPlayerExpMonth(0);
		setSaved(false);
		setupInfo(setup);
	}

	function removePlayer(index) {
		setup.players.splice(index, 1);
		if (renderList) {
			setRenderList(false);
		} else {
			setRenderList(true);
		}

		setupInfo(setup);
	}

	const savePlayersBtn = async () => {
		setImported(false);
		let resSavePlayers = await savePlayers(user, setup);
		if (resSavePlayers === undefined) {
			setError('Not logged in.');
		} else {
			setupInfo(resSavePlayers);
			setSaved(true);
		}
	}

	function finishSparringPlayers () {
		setup.isSet = true;
		setupInfo(setup);
	}

	return (
		<Box>
			<Typography variant="h5">Players</Typography>
			<Grid container direction="row" justify="center">
				<Grid item xs={12}>
					<Box mt={2} mb={2} display="flex" flexDirection="row" justifyContent="center">
						<Box>
							{saved && <Box mb={1}>Players saved to spreadsheet!</Box>}
							{imported && <Box mb={1}>Spreadsheet players imported!</Box>}
							{error.length > 0 && <Grid item xs={12}><Box mb={1}>{error}</Box></Grid>}
							<Box display="flex" flexDirection="row" justifyContent="center">
								<Box>
									<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => { setSaved(false); readSheetBtn(setupInfo, setImported, user, setup, setError) }}>Import</Button>
								</Box>
								<Box pl={1}>
									<Button onClick={() => savePlayersBtn()} variant="contained" color={night ? "secondary" : "primary"}>Save</Button>
									{/* <Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => readSheetBtn(setupInfo, setImported, user, setup)}>Import</Button> */}
								</Box>
							</Box>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={4}>
					<TextField value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} label="Name" variant="outlined" fullWidth={true} />
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={4}>
					<TextField value={playerNickname} onChange={(e) => { setPlayerNickname(e.target.value) }} label="Nickname (optional)" variant="outlined" fullWidth={true} />
				</Grid>
				<Grid item xs={4} sm={4} md={2} lg={1}>
					<TextField type="number" step="10" value={playerWeight} onChange={(e) => { setPlayerWeight(e.target.value) }} label="Weight (lbs)" variant="outlined" fullWidth={true} />
				</Grid>
				<Grid item xs={4} sm={3} md={2} lg={1} align="left">
					<TextField type="number" step="1" value={playerExpYr} onChange={(e) => { setPlayerExpYr(e.target.value) }} label="Exp (years)" variant="outlined" fullWidth={true} />
				</Grid>
				<Grid item xs={4} sm={3} md={2} lg={1} align="left">
					<TextField type="number" step="1" value={playerExpMonth} onChange={(e) => { setPlayerExpMonth(e.target.value) }} label="Exp (months)" variant="outlined" fullWidth={true} />
				</Grid>
				<Grid item xs={12} sm={2} md={2} lg={1}>
					<Button fullWidth={true} onClick={() => addPlayer()} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
				</Grid>
			</Grid>

			<Box mt={1}>
				<Grid container direction="row" justify="center">
					{setup.players.map((p, index) => {
						return (
							<Grid item xs={12} key={index}>
								<Box display="flex" flexDirection="row" justifyContent="center">
									{(p.name !== undefined && p.name.length > 0) && <Box>{p.name}</Box>}
									{(p.nickname !== undefined && p.nickname.length > 0) && <Box pl={1}>"{p.nickname}"</Box>}
									{(p.lName !== undefined && p.lName.length > 0) && <Box pl={1}>{p.lName}</Box>}
									{p.handicap !== undefined && <Box pl={1}>(Handicap: {p.handicap})</Box>}
									{(p.record !== undefined && p.record.length > 0) && <Box pl={1}>(Record: {p.record})</Box>}
									<IconButton size="small" onClick={() => removePlayer(index)}><DeleteForeverIcon color={night ? "secondary" : "primary"} /></IconButton>
								</Box>
							</Grid>
							// <Box key={index}>{p.name} <IconButton onClick={() => removePlayer(index)}><DeleteForeverIcon color={night ? "secondary" : "primary"} /></IconButton></Box>
						)
					})}
				</Grid>
			</Box>

			<Box mt={2} display="flex" flexDirection="row" justifyContent="center">
				<Box pr={1}>
					<ReachLink to="../handicaps" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained">Back</Button>
					</ReachLink>
				</Box>
				<Box>
					{
						setup.mode > 0 ?
							setup.mode > 1 ?
								<ReachLink to="../brackets" style={{ textDecoration: 'none' }}>
									<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
								</ReachLink>
								:
								<ReachLink to="../teams" style={{ textDecoration: 'none' }}>
									<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
								</ReachLink>
							:
							<Button color={night ? "secondary" : "primary"} variant="contained" onClick={() => finishSparringPlayers()}>Next</Button>
					}
				</Box>
			</Box>
		</Box>
	);
}

const TeamScreen = ({ setup, night, user, setupInfo, renderList, setRenderList, classes }) => {
	const [playerList, setPlayerList] = useState(setup.players);
	const [t1Name, setT1Name] = useState('');
	const [t2Name, setT2Name] = useState('');
	const [t1, setT1] = useState([]);
	const [t2, setT2] = useState([]);

	function addTeam(playerIndex, team) {
		if (team === 1) {
			let temp = playerList;
			setT1(t1 => [...t1, playerList[playerIndex]]);
			temp.splice(playerIndex, 1);
			setPlayerList(temp);
		} else {
			let temp = playerList;
			setT2(t2 => [...t2, playerList[playerIndex]]);
			temp.splice(playerIndex, 1);
			setPlayerList(temp);
		}
	}

	function switchTeam(index, currTeam, newTeam) {
		if (newTeam === 0) { // move back to pool of players
			if (currTeam === 1) {
				let temp = t1;
				let removed = temp.splice(index, 1);
				setT1(temp);
				// add to pool
				setPlayerList(playerList => [...playerList, removed[0]]);
			} else {
				let temp = t2;
				let removed = temp.splice(index, 1);
				setT2(temp);
				// add to pool
				setPlayerList(playerList => [...playerList, removed[0]]);
			}
		} else {
			if (newTeam === 1) {
				let temp = t2;
				let removed = temp.splice(index, 1);
				setT2(temp);
				// add to pool
				setT1(t1 => [...t1, removed[0]]);
			} else {
				let temp = t1;
				let removed = temp.splice(index, 1);
				setT1(temp);
				// add to pool
				setT2(t2 => [...t2, removed[0]]);
			}
		}
	}

	function totalHandicap(team) {
		let total = 0;
		if (team === 1) {
			for (var i = 0; i < t1.length; i++) {
				total += t1[i].handicap;
			}
		} else {
			for (var k = 0; k < t2.length; k++) {
				total += t2[k].handicap;
			}
		}
		return total;
	}

	function finalizeTeams() {
		let team1 = {};
		team1.name = t1Name;
		team1.players = t1;
		let team2 = {};
		team2.name = t2Name;
		team2.players = t2;
		setup.team1 = team1;
		setup.team2 = team2;
		setup.tournamentInfo.players = team1.players.concat(team2.players);
		setup.tournamentInfo.team1 = t1Name;
		setup.tournamentInfo.team1players = t1;
		setup.tournamentInfo.team2 = t2Name;
		setup.tournamentInfo.team2players = t2;
		setup.isSet = true;
		setupInfo(setup);
	}

	return (
		<Box>
			<Typography variant="h5">Teams</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={8} md={6}>
					<Box border={1} borderColor={night ? "secondary" : "primary"} p={2}>
						<Typography variant="h6">Players</Typography>
						{
							(playerList !== undefined && playerList.length > 0) &&
							playerList.map((player, index) => {
								return (
									<Box key={index} mb={1}>
										{player.name} ({player.handicap})&nbsp;
										<Button size="small" variant="outlined" color={night ? "secondary" : "primary"} onClick={() => addTeam(index, 1)}>Team 1</Button>&nbsp;
										<Button size="small" variant="outlined" color={night ? "secondary" : "primary"} onClick={() => addTeam(index, 2)}>Team 2</Button>
									</Box>
								);
							})
						}
					</Box>
				</Grid>
				<Grid item xs={12} sm={4} md={6}>
					<Box display="flex" flexDirection="column">
						<Box border={1} borderColor={night ? "secondary" : "primary"} p={2}>
							<Box mb={1}><Typography>{t1Name.length > 0 ? 'Team 1: ' + t1Name : 'Team 1'} {t1.length > 0 && <span>({t1.length})</span>}</Typography></Box>
							<Box color={totalHandicap(1) > 0 ? "green" : "red"} mt={1} mb={1}>Total Handicap: {totalHandicap(1)}</Box>
							<TextField value={t1Name} onChange={(e) => { setT1Name(e.target.value) }} label="Team 1 Name" variant="outlined" fullWidth={true} />
							<Box mt={1}>
								{
									(t1 !== undefined && t1.length > 0) &&
									t1.map((player, index) => {
										return (
											<Box key={index} mb={1}>
												{player.name} ({player.handicap})&nbsp;
												<IconButton color={night ? "secondary" : "primary"} size="small" onClick={() => switchTeam(index, 1, 2)}><KeyboardArrowDownIcon /></IconButton>
												<IconButton color={night ? "secondary" : "primary"} size="small" onClick={() => switchTeam(index, 1, 0)}><RemoveIcon /></IconButton>
											</Box>
										);
									})
								}
							</Box>
						</Box>
						<Box border={1} borderColor={night ? "secondary" : "primary"} p={2} mt={2}>
							<Box mb={1}><Typography>{t2Name.length > 0 ? 'Team 2: ' + t2Name : 'Team 2'} {t2.length > 0 && <span>({t2.length})</span>}</Typography></Box>
							<Box color={totalHandicap(2) > 0 ? "green" : "red"} mt={1} mb={1}>Total Handicap: {totalHandicap(2)}</Box>
							<TextField value={t2Name} onChange={(e) => { setT2Name(e.target.value) }} label="Team 2 Name" variant="outlined" fullWidth={true} />
							<Box mt={1}>
								{
									(t2 !== undefined && t2.length > 0) &&
									t2.map((player, index) => {
										return (
											<Box key={index} mb={1}>
												{player.name} (Handicap: {player.handicap})&nbsp;
												<IconButton color={night ? "secondary" : "primary"} size="small" onClick={() => switchTeam(index, 2, 1)}><KeyboardArrowUpIcon /></IconButton>
												<IconButton color={night ? "secondary" : "primary"} size="small" onClick={() => switchTeam(index, 2, 0)}><RemoveIcon /></IconButton>
											</Box>
										);
									})
								}
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>

			<Box mt={2} display="flex" flexDirection="row" justifyContent="center">
				<Box>
					<ReachLink to="../players" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained">Back</Button>
					</ReachLink>
				</Box>
				<Box pl={1}>
					{
						setup.mode > 0 ?
							setup.mode > 1 ?
								<ReachLink to="brackets" style={{ textDecoration: 'none' }}>
									<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
								</ReachLink>
								:
								<ReachLink to="../" style={{ textDecoration: 'none' }}>
									<Button color={night ? "secondary" : "primary"} variant="contained" onClick={() => finalizeTeams()}>Next</Button>
								</ReachLink>
							:
							<ReachLink to="handicaps" style={{ textDecoration: 'none' }}>
								<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
							</ReachLink>
					}
				</Box>
			</Box>
		</Box>
	);
}

const PenaltyScreen = ({ night, setup, setupInfo, setRenderList, renderList }) => {
	// penalty list
	// const [penaltyType, setPenaltyType] = useState('');
	// const [penaltyCat, setPenaltyCat] = useState(0);
	// const [penaltyDesc, setPenaltyDesc] = useState('');
	// const [penaltyPts, setPenaltyPts] = useState(0);
	// const [penaltyLimit, setPenaltyLimit] = useState(0);
	// const [random, setRandom] = useState(false);

	// const handleCheck = (event) => {
	// 	setRandom(event.target.checked);
	// }


	function importPenalties() {
		setup.listPenalties = defaultPenalties;

		if (renderList) {
			setRenderList(false);
		} else {
			setRenderList(true);
		}
	}

	// function removePenalties(index) {
	// 	setup.listPenalties.splice(index, 1);
	// 	if (renderList) {
	// 		setRenderList(false);
	// 	} else {
	// 		setRenderList(true);
	// 	}
	// }

	///TODO: fix this so it fits with new data structure (arr of arrs)
	// function addPenalty() {
	// 	setup.listPenalties.push({
	// 		category: parseInt(penaltyCat),
	// 		limit: parseInt(penaltyLimit),
	// 		random: random,
	// 		type: penaltyType,
	// 		desc: penaltyDesc,
	// 		pts: parseInt(penaltyPts)
	// 	});
	// 	// reset form
	// 	setPenaltyCat(0);
	// 	setPenaltyLimit(0);
	// 	setPenaltyType('');
	// 	setPenaltyDesc('');
	// 	setPenaltyPts(0);
	// 	setRandom(false);
	// }

	return (
		<Box>
			<Typography variant="h5">Penalties</Typography>
			<Box mb={1}><Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => importPenalties()}>Default</Button></Box>
			<Grid container direction="row" justify="center">
				{/* <Grid item xs={7} sm={9} md={9} lg={2}>
							<TextField value={penaltyType} onChange={(e) => { setPenaltyType(e.target.value) }} label="Type (ex: Positional)" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={5} sm={3} md={3} lg={1}>
							<TextField value={penaltyCat} onChange={(e) => { setPenaltyCat(e.target.value) }} type="number" step="1" label="Category" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={12} sm={12} md={9} lg={4}>
							<TextField value={penaltyDesc} onChange={(e) => { setPenaltyDesc(e.target.value) }} label="Description" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={6} sm={3} md={3} lg={1}>
							<TextField value={penaltyPts} onChange={(e) => { setPenaltyPts(e.target.value) }} type="number" step="1" label="Points" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={6} sm={3} md={3} lg={2}>
							<FormControlLabel
								className={classes.label}
								labelPlacement="start"
								control={
									<Checkbox
										checked={random}
										onChange={handleCheck}
										name="random"
										color={night ? "secondary" : "primary"}
									/>
								}
								label="Random"
							/>
						</Grid>
						<Grid item xs={6} sm={3} md={3} lg={1}>
							<TextField value={penaltyLimit} onChange={(e) => { setPenaltyLimit(e.target.value) }} type="number" step="1" label="Limit" variant="outlined" fullWidth={true} />
						</Grid>
						<Grid item xs={6} sm={3} md={3} lg={1}>
							<Button onClick={addPenalty} fullWidth={true} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
						</Grid> */}
				{
					setup.listPenalties.length > 0 &&
					<Grid container direction="column">
						{
							setup.listPenalties.map(sub => sub.map((p, index) => {
								return (
									<Box mt={1} justifyContent="center" display="flex" flexDirection="row" key={index}>
										<Category id={p.category} index={index} type={p.type} />
										<Box ml={1}>
											{p.desc}&nbsp;
											[Points: {p.pts}]&nbsp;
											[Random: {p.random.toString()}]&nbsp;
											[Limit: {p.limit}]
											{/* <IconButton onClick={() => removePenalties(index)}><DeleteForeverIcon color={night ? "secondary" : "primary"} /></IconButton> */}
										</Box>
									</Box>
								)
							}))
						}
					</Grid>
				}
			</Grid>

			<Box mt={2} display="flex" flexDirection="row" justifyContent="center">
				<Box>
					<ReachLink to="../players" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained">Back</Button>
					</ReachLink>
				</Box>
				<Box pl={1}>
					<Button color={night ? "secondary" : "primary"} variant="contained" onClick={() => { setup.isSet = true; setupInfo(setup) }}>Finish</Button>
				</Box>

				{/* <ReachLink to="../" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
					</ReachLink> */}
			</Box>
		</Box>
	);
}

export const Setup = ({ updateUser, setupInfo, setup, night, logged, user, logout }) => {
	const classes = regStyles({ night: night });
	const [renderList, setRenderList] = useState(false);

	return (
		<Box display="flex" flexDirection="column" p={1} textAlign="center">
			<Typography variant="h3">Setup</Typography>
			<Box mb={2}>
				<Paper className={classes.paper}>
					<Router>
						<InitialScreen path='/' setup={setup} setupInfo={setupInfo} updateUser={updateUser} user={user} logged={logged} night={night} />
						<TournamentScreen path='mode' classes={classes} setup={setup} setupInfo={setupInfo} user={user} logged={logged} night={night} />
						<TournamentInfoScreen path='info' classes={classes} setup={setup} setupInfo={setupInfo} user={user} logged={logged} night={night} />
						<HandicapPointsScreen path='handicaps' classes={classes} setup={setup} setupInfo={setupInfo} user={user} logged={logged} night={night} />
						<PlayerScreen path='players' classes={classes} renderList={renderList} setRenderList={setRenderList}
							setup={setup} setupInfo={setupInfo} user={user} logged={logged} night={night} />
						<TeamScreen path='teams' classes={classes} renderList={renderList} setRenderList={setRenderList}
							setup={setup} setupInfo={setupInfo} user={user} logged={logged} night={night} />
						<PenaltyScreen path='penalties' renderList={renderList} setRenderList={setRenderList}
							setup={setup} setupInfo={setupInfo} user={user} logged={logged} night={night} />
					</Router>
					{/* <Typography variant="subtitle1">{setup.mode === 0 ? '[Sparring]' : '[Tournament]'}</Typography> */}
				</Paper>
			</Box>
			{/* <Button color={night ? "secondary" : "primary"} variant="contained" onClick={() => { setup.isSet = true; setupInfo(setup) }}>Next</Button> */}
			<ButtonMenu night={night} logged={logged} logout={logout} />
		</Box >
	);
}
