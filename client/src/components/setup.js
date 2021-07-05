import React, { useState } from 'react';
import { IconButton, Grid, Paper, Button, TextField, Tooltip, Typography, Box, Link } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const Setup = ({ setupInfo, setup, night, logged }) => {
	const classes = regStyles({ night: night });
	const [handicaps, setHandicaps] = useState(false);
	const [handicapWeight, setHandicapWeight] = useState();
	const [handicapWeightPts, setHandicapWeightPts] = useState();
	const [handicapExp, setHandicapExp] = useState();
	const [handicapExpPts, setHandicapExpPts] = useState();
	const [handicapTotal, setHandicapTotal] = useState(0);
	const [playerWeight, setPlayerWeight] = useState(0);
	const [playerName, setPlayerName] = useState('');
	const [playerExpYr, setPlayerExpYr] = useState(0);
	const [playerExpMonth, setPlayerExpMonth] = useState(0);
	const [renderList, setRenderList] = useState(false);

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

		// console.log(setup.players[0].weight - setup.players[2].weight);
	}

	function removePlayer(index) {
		setup.players.splice(index, 1);
		if (renderList) {
			setRenderList(false);
		} else {
			setRenderList(true);
		}
	}

	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw" textAlign="center">
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
							<Grid item xs={12} sm={12} md={4} lg={4}>
								<TextField value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} label="Name" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={4} md={2} lg={2}>
								<TextField type="number" step="10" value={playerWeight} onChange={(e) => { setPlayerWeight(e.target.value) }} label="Weight (lbs)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={3} md={2} lg={2} align="left">
								<TextField type="number" step="1" value={playerExpYr} onChange={(e) => { setPlayerExpYr(e.target.value) }} label="Exp (years)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={3} md={2} lg={2} align="left">
								<TextField type="number" step="1" value={playerExpMonth} onChange={(e) => { setPlayerExpMonth(e.target.value) }} label="Exp (months)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={12} sm={2} md={2} lg={2}>
								<Button fullWidth={true} onClick={() => addPlayer()} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
							</Grid>
						</Grid>
						{setup.players.map((p, index) => { return <Box key={index}>{p.name} <IconButton onClick={() => removePlayer(index)}><DeleteForeverIcon color={night ? "secondary" : "primary"} /></IconButton></Box> })}
					</Paper>
				</Box>
				{
					(handicapTotal > 0) &&
					<Box mb={2}>
						<Paper className={classes.paper}>
							<Typography variant="h5">Penalties</Typography>
							<Grid container direction="row" justify="center">
								<Grid item xs={12} sm={12} md={4} lg={4}>
									<TextField label="Name" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={4} sm={4} md={2} lg={2}>
									<TextField type="number" step="10" label="Weight (lbs)" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={4} sm={3} md={2} lg={2} align="left">
									<TextField type="number" step="1" label="Exp (years)" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={4} sm={3} md={2} lg={2} align="left">
									<TextField type="number" step="1" label="Exp (months)" variant="outlined" fullWidth={true} />
								</Grid>
								<Grid item xs={12} sm={2} md={2} lg={2}>
									<Button fullWidth={true} variant="outlined" className={classes.inputAdd} width="100%">Add</Button>
								</Grid>
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
