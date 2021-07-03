import React from 'react';
import { Divider, Grid, Paper, Button, TextField, Tooltip, Typography, Box, Link } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';

export const Setup = ({ setupInfo, setup, night, logged }) => {
	const classes = regStyles({ night: night });
	let playerIndex = 0;
	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw" textAlign="center">
			<Typography variant="h3">Setup</Typography>
			<Typography variant="subtitle1">{setup.mode === 0 ? '[Sparring]' : '[Tournament]'}</Typography>
			<form noValidate autoComplete="off">
				<Box mb={2}>
					<Paper className={classes.paper}>
						<Typography variant="h5">Handicaps</Typography>
						<Grid container direction="row" justify="center">
							<Grid item xs={8} sm={6} md={3} lg={2} xsAlign="center" mdAlign="right">
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
						</Grid>
					</Paper>
				</Box>
				<Box mb={2}>
					<Paper className={classes.paper}>
						<Typography variant="h5">Players</Typography>
						<Grid container direction="row" justify="center">
							<Grid item xs={12} sm={12} md={4} lg={4} xsAlign="center" mdAlign="right">
								<TextField id={"p" + playerIndex} label="Name" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={4} sm={4} md={2} lg={2} xsAlign="center" mdAlign="left">
								<TextField type="number" step="10" id={"p" + playerIndex + "Weight"} label="Weight (lbs)" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={4} sm={3} md={2} lg={2} align="left">
								<TextField type="number" step="1" id={"p" + playerIndex + "ExpYrs"} label="Exp (years)" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={4} sm={3} md={2} lg={2} align="left">
								<TextField type="number" step="1" id={"p" + playerIndex + "ExpMonths"} label="Exp (months)" variant="outlined" fullWidth="true" />
							</Grid>
							<Grid item xs={12} sm={2} md={2} lg={2}>
								<Button fullWidth={true} variant="outlined" className={classes.inputAdd} width="100%">Add</Button>
							</Grid>
						</Grid>
					</Paper>
				</Box>
				{/* <Box pb={1} pt={1}>
					<TextField id="" label="Weight (lbs)" variant="outlined" />
					<TextField id="" label="Experience (months)" variant="outlined" />
					<Button variant="outlined" className={classes.inputAdd}>Add</Button>
				</Box>
				<Box>
					<TextField type="number" id="exp" label="Experience (months)" variant="outlined" />
					<TextField type="number" step="1" id="expPts" label="Points" variant="outlined" />
				</Box> */}
			</form>
			<Button onClick={() => { setup.isSet = true; setupInfo(setup) }}>test</Button>
			<Menu night={night} logged={logged} />
		</Box >
	);
}
