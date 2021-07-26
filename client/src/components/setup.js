import React, { useState } from 'react';
import { IconButton, Grid, Paper, Button, TextField, Typography, Box, } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { ButtonMenu } from './menu/menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { defaultHandicaps, defaultPenalties } from './setup/setupVars';
import { Category } from './setup/category';

export const Setup = ({ updateUser, setupInfo, setup, night, logged, user, logout }) => {
	const classes = regStyles({ night: night });
	// handicap pts
	const [handicaps, setHandicaps] = useState(false);
	const [handicapWeight, setHandicapWeight] = useState(0);
	const [handicapWeightPts, setHandicapWeightPts] = useState(0);
	const [handicapExp, setHandicapExp] = useState(0);
	const [handicapExpPts, setHandicapExpPts] = useState(0);
	// player info
	const [playerWeight, setPlayerWeight] = useState(0);
	const [playerName, setPlayerName] = useState('');
	const [playerNickname, setPlayerNickname] = useState('');
	const [playerExpYr, setPlayerExpYr] = useState(0);
	const [playerExpMonth, setPlayerExpMonth] = useState(0);

	const [renderList, setRenderList] = useState(false);
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
	}

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
	}

	function removePlayer(index) {
		setup.players.splice(index, 1);
		if (renderList) {
			setRenderList(false);
		} else {
			setRenderList(true);
		}
	}

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

	const createSheet = async () => {
		try {
			const res = await fetch("/api/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});

			const data = await res.json();
			if (res.status === 200) {
				updateUser(data);
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	const readSheet = async () => {
		if (user.spreadsheetId.length > 0) {
			try {
				const res = await fetch("/api/getSheetInfo", {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});

				const data = await res.json();
				console.log(data);
				if (data.data.valueRanges.length > 0) {
					const hW = parseInt(data.data.valueRanges[1].values[0][1]);
					setHandicapWeight(hW);
					const xp = parseInt(data.data.valueRanges[1].values[0][2]);
					setHandicapExp(xp);
					// set handicap vars
					setup.handicaps = [];
					setup.handicaps.push({
						name: "Weight Handicap",
						unit: 'lbs',
						amount: hW,
						pts: parseInt(data.data.valueRanges[3].values[0][1])
					});
					setup.handicaps.push({
						name: "Experience Handicap",
						unit: 'months',
						amount: xp,
						pts: parseInt(data.data.valueRanges[3].values[0][2])
					});
					setup.setHandicaps = true;
					setHandicaps(true);

					// form penalty objs
					let importedPenalties = [];
					let importedPenaltiesArr = [];
					const baseArr = data.data.valueRanges;
					const res = [...new Set([].concat(...baseArr.map((o, index) => { return (index > 5 ? o.values : []) })))];

					for (var i = 1; i < res[0].length; i++) {
						let temp = {};
						temp.desc = res[0][i];
						temp.pts = parseInt(res[1][i]);
						temp.type = res[2][i];
						temp.random = res[3][i] === 'TRUE' ? true : false;
						temp.limit = parseInt(res[4][i]);
						temp.category = parseInt(res[5][i]);
						temp.info = res[6][i];
						importedPenalties.push(temp);
					}

					// group penalties by category
					let curr = 1;
					let t = [];
					for (var k = 0; k < importedPenalties.length; k++) {
						if ((importedPenalties[k].category) === (curr + 1)) {
							importedPenaltiesArr.push(t);
							t = [];
							curr++;
						}

						if (importedPenalties[k].category === curr) {
							t.push(importedPenalties[k]);
							if (k === importedPenalties.length - 1) {
								importedPenaltiesArr.push(t);
							}
						}
					}

					setup.listPenalties = importedPenaltiesArr;

					// form player obj
					const playerRes = [...new Set([].concat(...baseArr.map((o, index) => { return (index > 12 ? o.values : []) })))];
					setup.players = [];

					for (var j = 1; j < playerRes[0].length; j++) {
						let temp = {};
						temp.name = playerRes[0][j].split(" ")[0];
						temp.lName = playerRes[0][j].split(" ")[1];
						temp.weight = -1;
						temp.expYr = -1;
						temp.expMonth = -1;
						temp.nickname = playerRes[1][j];
						temp.handicap = parseInt(playerRes[2][j]);
						temp.record = playerRes[3][j];
						// players.push(temp);
						setup.players.push(temp);
					}

					// add gym avg to setup obj
					setup.gymAvg = {
						weight: parseInt(res[11][0]),
						weightUnit: res[12][0],
						exp: parseInt(res[11][1]),
						expUnit: res[12][1]
					}
					
					// save latest match row
					setup.matches = {
						current: data.data.valueRanges[19].values[0].length+1
					}

					if (renderList) {
						setRenderList(false);
					} else {
						setRenderList(true);
					}
				}
			}
			catch (error) {
				console.log(error);
			}
		} else {

		}
	}

	function calcHandicapAvg(weight, expYr, expMonth) {
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

	function formatPlayers() {
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
	}

	const savePlayers = async () => {
		let data = [];
		// find all added players
		for (var i = 0; i < setup.players.length; i++) {
			let tempArr = [];
			if (setup.players[i].weight > 0) {
				const handicap = calcHandicapAvg(setup.players[i].weight, setup.players[i].expYr, setup.players[i].expMonth);
				tempArr.push(
					setup.players[i].name,
					setup.players[i].nickname,
					handicap,
					'0-0'
				)
				data.push(tempArr);
			}
		}
		const range = "Players!A" + (setup.players.length - data.length + 2).toString();
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
				const res = await fetch("/api/savePlayers", {
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
					formatPlayers();
				}
			}
			catch (error) {
				console.log(error);
			}
		} else {

		}
	}

	return (
		<Box display="flex" flexDirection="column" p={1} textAlign="center">
			<Typography variant="h3">Setup</Typography>
			<Box mb={2}>
				<Paper className={classes.paper}>
					<Typography variant="subtitle1">{setup.mode === 0 ? '[Sparring]' : '[Tournament]'}</Typography>
					{logged ?
						<Box>
							{user.spreadsheetId !== undefined && user.spreadsheetId.length > 0 ?
								<Box>
									<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => readSheet()}>Import</Button>
								</Box>
								:
								<Box>
									You don't currently have a spreadsheet to import from.
									<Box mt={1}>
										<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => createSheet()}>Create</Button>
									</Box>
								</Box>
							}

						</Box>
						:
						<Box>Login to import custom settings and save match history</Box>
					}
				</Paper>
			</Box>
			<form noValidate autoComplete="off">
				<Box mb={2}>
					<Paper className={classes.paper}>
						<Typography variant="h5">Handicap Points</Typography>
						<Grid container direction="row" justify="center">
							{handicaps === false ?
								<>
									<Grid item xs={12}>
										<Box mb={1}>
											<Button variant="contained" color={night ? "secondary" : "primary"} onClick={() => importDefaultHandicap()}>Default</Button>
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
										<Button onClick={() => addHandicap()} fullWidth={true} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
									</Grid>
									<Grid item xs={6} sm={2} md={2} lg={2}>
										<Button onClick={() => add0Handicap()} fullWidth={true} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">No Handicap</Button>
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
										<Button fullWidth={true} onClick={() => resetHandicap()} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Reset</Button>
									</Grid>
								</>
							}
						</Grid>
					</Paper>
				</Box>
				<Box mb={2}>
					<Paper className={classes.paper}>
						<Typography variant="h5">Players</Typography>
						<Grid container direction="row" justify="center">
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

						<Grid container direction="row" justify="center">
							{setup.players.map((p, index) => { return <Box key={index}>{p.name} <IconButton onClick={() => removePlayer(index)}><DeleteForeverIcon color={night ? "secondary" : "primary"} /></IconButton></Box> })}
						</Grid>
						{(setup.gymAvg !== null && setup.gymAvg !== undefined && Object.keys(setup.gymAvg).length > 0) &&
							<Button onClick={() => savePlayers()} variant="contained" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Save</Button>
						}
					</Paper>
				</Box>
				<Box mb={2}>
					<Paper className={classes.paper}>
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
					</Paper>
				</Box>
			</form>
			<Button color={night ? "secondary" : "primary"} variant="contained" onClick={() => { setup.isSet = true; setupInfo(setup) }}>Next</Button>
			<ButtonMenu night={night} logged={logged} logout={logout} />
		</Box >
	);
}
