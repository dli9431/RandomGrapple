import React, { useState } from 'react';
import { FormControlLabel, Checkbox, IconButton, Grid, Paper, Button, TextField, Tooltip, Typography, Box, Link } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const defaultPenalties = [
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start in side control",
		pts: 1
	},
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start in knee on belly",
		pts: 2
	},
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start in kesa gatame",
		pts: 3
	},
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start in mount",
		pts: 4
	},
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start in high mount",
		pts: 5
	},
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start on back",
		pts: 6
	},
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start on back with arm trap",
		pts: 7
	},
	{
		category: 1,
		limit: 0,
		random: false,
		type: "positional",
		desc: "Start on back with arm trap + deep collar grip",
		pts: 8
	},
	{
		category: 2,
		limit: 0,
		random: true,
		type: "points/subs",
		desc: "Subonly for opponent",
		pts: 10
	},
	{
		category: 2,
		limit: 1,
		random: true,
		type: "points/subs",
		desc: "Start match 4-0 in points",
		pts: 10
	},
	{
		category: 2,
		limit: 1,
		random: true,
		type: "points/subs",
		desc: "Start match 4-0 in points + Subonly for opponent",
		pts: 10
	},
	{
		category: 2,
		limit: 1,
		random: true,
		type: "points/subs",
		desc: "Start match 4-0 in points + Subonly for opponent + doubled points for self",
		pts: 10
	},
	{
		category: 2,
		limit: 1,
		random: true,
		type: "points",
		desc: "Opponent must sub 3x to win",
		pts: 10
	},
];

export const Category = (props) => {
	let color = '';
	switch (props.id) {
		case 1:
			color = 'grey';
			break;
		case 2:
			color = 'blue';
			break;
		case 3:
			color = 'green';
			break;
		case 4:
			color = 'purple';
			break;
		case 5:
			color = 'orange';
			break;
		case 6:
			color = 'red'
			break;
		default:
			break;
	}
	return (
		<Box p={1} display="flex" flexDirection="column" justifyContent="center" key={props.index} border={1} borderColor={color}>{props.type}</Box>
	);
}

export const Setup = ({ setupInfo, setup, night, logged }) => {
	const classes = regStyles({ night: night });
	const [handicaps, setHandicaps] = useState(false);
	const [handicapWeight, setHandicapWeight] = useState();
	const [handicapWeightPts, setHandicapWeightPts] = useState();
	const [handicapExp, setHandicapExp] = useState();
	const [handicapExpPts, setHandicapExpPts] = useState();
	const [playerWeight, setPlayerWeight] = useState(0);
	const [playerName, setPlayerName] = useState('');
	const [playerExpYr, setPlayerExpYr] = useState(0);
	const [playerExpMonth, setPlayerExpMonth] = useState(0);
	const [renderList, setRenderList] = useState(false);
	const [random, setRandom] = useState(false);

	const handleCheck = (event) => {
		setRandom(event.target.checked);
	}

	function addHandicap() {
		setup.handicaps = [];
		setup.handicaps.push({
			name: "Weight Handicap",
			amount: handicapWeight,
			pts: handicapWeightPts
		});
		setup.handicaps.push({
			name: "Experience Handicap",
			amount: handicapExp,
			pts: handicapExpPts
		});
		setHandicaps(true);
	}
	function add0Handicap() {
		setup.handicaps = [];
		setup.handicaps.push({
			name: "Weight Handicap",
			amount: 0,
			pts: 0
		});
		setup.handicaps.push({
			name: "Experience Handicap",
			amount: 0,
			pts: 0
		});
		setHandicaps(true);
		console.log(setup.handicaps);
	}

	function resetHandicap() {
		setup.handicaps = [];
		setHandicaps(false);
	}

	function addPlayer() {
		setup.players.push({
			name: playerName,
			weight: playerWeight,
			expYr: playerExpYr,
			expMonth: playerExpMonth
		});
		// reset form
		setPlayerName('');
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
		console.log(setup);
		console.log(setup.listPenalties);
	}

	function removePenalties(index) {
		setup.listPenalties.splice(index, 1);
		if (renderList) {
			setRenderList(false);
		} else {
			setRenderList(true);
		}
	}

	return (
		<Box display="flex" flexDirection="column" p={1} textAlign="center">
			<Typography variant="h3">Setup</Typography>
			<Typography variant="subtitle1">{setup.mode === 0 ? '[Sparring]' : '[Tournament]'}</Typography>
			<form noValidate autoComplete="off">
				<Box mb={2}>
					<Paper className={classes.paper}>
						<Typography variant="h5">Handicap Points</Typography>
						<Grid container direction="row" justify="center">
							{handicaps === false ?
								<>
									<Grid item xs={8} sm={6} md={3} lg={2}>
										<TextField type="number" step="10" defaultValue={handicapWeight} onChange={(e) => { setHandicapWeight(e.target.value) }} label="Weight (lbs)" variant="outlined" fullWidth={true} />
									</Grid>
									<Grid item xs={4} sm={6} md={1} lg={2}>
										<TextField type="number" step="1" defaultValue={handicapWeightPts} onChange={(e) => { setHandicapWeightPts(e.target.value) }} label="Points" variant="outlined" fullWidth={true} />
									</Grid>
									<Grid item xs={8} sm={6} md={3} lg={2}>
										<TextField type="number" step="1" defaultValue={handicapExp} onChange={(e) => { setHandicapExp(e.target.value) }} label="Exp (months)" variant="outlined" fullWidth={true} />
									</Grid>
									<Grid item xs={4} sm={6} md={1} lg={2}>
										<TextField type="number" step="1" defaultValue={handicapExpPts} onChange={(e) => { setHandicapExpPts(e.target.value) }} label="Points" variant="outlined" fullWidth={true} />
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
											{Object.keys(setup.handicaps).map(function (key, index) { return <Box key={index}>{setup.handicaps[key].name + ": " + setup.handicaps[key].amount + " lbs / " + setup.handicaps[key].pts + " pts"}</Box> })}
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
							<Grid item xs={4} sm={4} md={2} lg={1}>
								<TextField type="number" step="10" value={playerWeight} onChange={(e) => { setPlayerWeight(e.target.value) }} label="Weight (lbs)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={3} md={1} lg={1} align="left">
								<TextField type="number" step="1" value={playerExpYr} onChange={(e) => { setPlayerExpYr(e.target.value) }} label="Exp (years)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={3} md={1} lg={1} align="left">
								<TextField type="number" step="1" value={playerExpMonth} onChange={(e) => { setPlayerExpMonth(e.target.value) }} label="Exp (months)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={12} sm={2} md={1} lg={1}>
								<Button fullWidth={true} onClick={() => addPlayer()} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
							</Grid>
						</Grid>

						<Grid container direction="row" justify="center">
							{setup.players.map((p, index) => { return <Box key={index}>{p.name} <IconButton onClick={() => removePlayer(index)}><DeleteForeverIcon color={night ? "secondary" : "primary"} /></IconButton></Box> })}
						</Grid>
					</Paper>
				</Box>
				{
					((handicapWeight > 0 && handicapWeightPts > 0) || (handicapExp > 0 && handicapExpPts > 0)) &&
					<Box mb={2}>
						<Paper className={classes.paper}>
							<Typography variant="h5">Penalties</Typography>
							<Button onClick={() => importPenalties()} >Import</Button>
							<Grid container direction="row" justify="center">
								<Grid item xs={7} sm={9} md={9} lg={2}>
									<TextField label="Type (ex: Positional)" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={5} sm={3} md={3} lg={1}>
									<TextField type="number" step="1" label="Category" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={12} sm={12} md={9} lg={4}>
									<TextField label="Description" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={6} sm={3} md={3} lg={1}>
									<TextField type="number" step="1" label="Points" variant="outlined" fullWidth={true} />
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
									<TextField type="number" step="1" label="Limit" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={6} sm={3} md={3} lg={1}>
									<Button fullWidth={true} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
								</Grid>
							</Grid>
							<Grid container direction="column">
								{setup.listPenalties.map((p, index) => {
									return (
										<Box mt={1} justifyContent="center" display="flex" flexDirection="row" key={p.id}>
											<Category id={p.category} index={index} type={p.type} />
											<Box ml={1}>
												{p.desc}&nbsp;
												[Points: {p.pts}]&nbsp;
												[Random: {p.random.toString()}]&nbsp;
												[Limit: {p.limit}]
												<IconButton onClick={() => removePenalties(index)}><DeleteForeverIcon color={night ? "secondary" : "primary"} /></IconButton>
											</Box>
										</Box>
									)
								})}
							</Grid>
						</Paper>
					</Box>
				}
			</form>
			<Button onClick={() => { setup.isSet = true; setupInfo(setup) }}>test</Button>
			<Menu night={night} logged={logged} />
		</Box >
	);
}
