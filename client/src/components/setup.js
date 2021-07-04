import React, { useState } from 'react';
import { Grid, Paper, Button, TextField, Tooltip, Typography, Box, Link } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';

export const Setup = ({ setupInfo, setup, night, logged }) => {
	const classes = regStyles({ night: night });
	const [handicaps, setHandicaps] = useState(false);
	const [handicapWeight, setHandicapWeight] = useState();
	const [handicapWeightPts, setHandicapWeightPts] = useState();
	const [handicapExp, setHandicapExp] = useState();
	const [handicapExpPts, setHandicapExpPts] = useState();
	const [playerIndex, setPlayerIndex] = useState(0);
	
	const addHandicap = () => {
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
		})
		// setup.handicaps.handicapWeight = handicapWeight;
		// setup.handicaps.handicapWeightPts = handicapWeightPts;
		// setup.handicaps.handicapExp = handicapExp;
		// setup.handicaps.handicapExpPts = handicapExpPts;
		setHandicaps(true);
	}

	const resetHandicap = () => {
		setup.handicaps = [];
		setHandicaps(false);
		console.log(setup);
	}

	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw" textAlign="center">
			<Typography variant="h3">Setup</Typography>
			<Typography variant="subtitle1">{setup.mode === 0 ? '[Sparring]' : '[Tournament]'}</Typography>
			<form noValidate autoComplete="off">
				<Box mb={2}>
					<Paper className={classes.paper}>
						<Typography variant="h5">Handicaps</Typography>
						{/* <Grid container direction="row" justify="center">
							<Grid item xs={12}>
								<Box mb={1}>

								</Box>
							</Grid>
							<Grid item xs={6} sm={2} md={2} lg={2}>
								<Button fullWidth={true} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Reset</Button>
							</Grid>
						</Grid> */}
						<Grid container direction="row" justify="center">
							{handicaps === false ?
									<>
										<Grid item xs={8} sm={6} md={3} lg={2}>
											<TextField type="number" step="10" defaultValue={handicapWeight} onChange={(e) => {setHandicapWeight(e.target.value)}} label="Weight (lbs)" variant="outlined" fullWidth={true}/>
										</Grid>
										<Grid item xs={4} sm={6} md={1} lg={2}>
											<TextField type="number" step="1" defaultValue={handicapWeightPts} onChange={(e) => {setHandicapWeightPts(e.target.value)}} label="Points" variant="outlined" fullWidth={true} />
										</Grid>
										<Grid item xs={8} sm={6} md={3} lg={2}>
											<TextField type="number" step="1" defaultValue={handicapExp} onChange={(e) => {setHandicapExp(e.target.value)}}  label="Exp (months)" variant="outlined" fullWidth={true} />
										</Grid>
										<Grid item xs={4} sm={6} md={1} lg={2}>
											<TextField type="number" step="1" defaultValue={handicapExpPts} onChange={(e) => {setHandicapExpPts(e.target.value)}} label="Points" variant="outlined" fullWidth={true} />
										</Grid>
										<Grid item xs={6} sm={2} md={2} lg={2}>
											<Button onClick={addHandicap} fullWidth={true} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
										</Grid>
									</>
									:
									<>
										<Grid item xs={12}>
											<Box mb={1}>
												{Object.keys(setup.handicaps).map(function(key, index) { return <Box>{setup.handicaps[key].name + ": " + setup.handicaps[key].amount + " lbs / " + setup.handicaps[key].pts + " pts" }</Box>})}
											</Box>
										</Grid>
										<Grid item xs={6} sm={2} md={2} lg={2}>
											<Button fullWidth={true} onClick={resetHandicap} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Reset</Button>
										</Grid>
									</>
							}

							{/* <Grid item xs={8} sm={6} md={3} lg={2} xsAlign="center" mdAlign="right">
								<TextField type="number" step="10" id="weight" label="Weight (lbs)" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={4} sm={6} md={1} lg={2} xsAlign="center" mdAlign="left">
								<TextField type="number" step="1" id="weightPts" label="Points" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={8} sm={6} md={3} lg={2} xsAlign="center" mdAlign="right">
								<TextField type="number" step="1" id="exp" label="Exp (months)" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={4} sm={6} md={1} lg={2} xsAlign="center" mdAlign="left">
								<TextField type="number" step="1" id="expPts" label="Points" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={6} sm={2} md={2} lg={2}>
								<Button fullWidth={true} variant="outlined" className={classes.inputAdd} color={night ? "secondary" : "primary"} width="100%">Add</Button>
							</Grid>
							 */}
						</Grid>
					</Paper>
				</Box>
				<Box mb={2}>
					<Paper className={classes.paper}>
						<Typography variant="h5">Players</Typography>
						<Grid container direction="row" justify="center">
							<Grid item xs={12} sm={12} md={4} lg={4}>
								<TextField id={"p" + playerIndex} label="Name" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={4} md={2} lg={2}>
								<TextField type="number" step="10" id={"p" + playerIndex + "Weight"} label="Weight (lbs)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={3} md={2} lg={2} align="left">
								<TextField type="number" step="1" id={"p" + playerIndex + "ExpYrs"} label="Exp (years)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={4} sm={3} md={2} lg={2} align="left">
								<TextField type="number" step="1" id={"p" + playerIndex + "ExpMonths"} label="Exp (months)" variant="outlined" fullWidth={true} />
							</Grid>
							<Grid item xs={12} sm={2} md={2} lg={2}>
								<Button fullWidth={true} variant="outlined" className={classes.inputAdd} width="100%">Add</Button>
							</Grid>
						</Grid>
					</Paper>
				</Box>
			</form>
			<Button onClick={() => { setup.isSet = true; setupInfo(setup) }}>test</Button>
			<Menu night={night} logged={logged} />
		</Box >
	);
}
