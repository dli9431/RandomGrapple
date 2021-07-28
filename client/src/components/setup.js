import React, { useEffect, useState } from 'react';
import { Router, Link as ReachLink } from '@reach/router';
import { Link, IconButton, Grid, Paper, Button, TextField, Typography, Box, } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { ButtonMenu } from './menu/menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { defaultHandicaps, defaultPenalties } from './setup/setupVars';
import { Category } from './setup/category';
import { readSheet, createSheet, savePlayers } from './auth/sheets';

const readSheetBtn = async (setupInfo, setImported, user, setup, setError) => {
	let reSetup = await readSheet(user, setup);
	if (reSetup === 'error') {
		setImported(false);
		setError('Error - session ended, please log in again');
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
						<ReachLink to="../handicaps" style={{ textDecoration: 'none' }}>
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
		setHandicapWeight(20);
		setHandicapWeightPts(1);
		setHandicapExp(3);
		setHandicapExpPts(1);
		setup.handicaps = [];
		setup.handicaps = defaultHandicaps;
		setup.setHandicaps = true;
	}

	function resetHandicap() {
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
					<ReachLink to="../" style={{ textDecoration: 'none' }}>
						<Button color={night ? "secondary" : "primary"} variant="contained">Back</Button>
					</ReachLink>
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
		setupInfo(resSavePlayers);
		setSaved(true);
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
							{error.length > 0 && <Grid item xs={12}><Box mt={1}>{error}</Box></Grid>}
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
							<ReachLink to="handicaps" style={{ textDecoration: 'none' }}>
								<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
							</ReachLink>
					}
				</Box>
			</Box>
		</Box>
	);
}

const TeamScreen = ({ setup, night, user, setupInfo, renderList, setRenderList, classes }) => {
	return (
		<Box>
			<Typography variant="h5">Teams</Typography>
			<Grid container>
				<Grid item xs={12} sm={6}>
					Team 1
				</Grid>
				<Grid item xs={12} sm={6}>
					Team 2
				</Grid>
			</Grid>

			<Box>
				{
					setup.mode > 0 ?
						setup.mode > 1 ?
							<ReachLink to="brackets" style={{ textDecoration: 'none' }}>
								<Button color={night ? "secondary" : "primary"} variant="contained">Next</Button>
							</ReachLink>
							:
							<ReachLink to="teams" style={{ textDecoration: 'none' }}>
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
