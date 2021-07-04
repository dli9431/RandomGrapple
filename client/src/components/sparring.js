import React, { useState } from 'react';
import { Button, Grid, Paper, Tooltip, Typography, Box, Link } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReplayIcon from '@material-ui/icons/Replay';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';
import { Setup } from './setup';

export const Sparring = (props) => {
	const classes = regStyles({ night: props.night });
	const [setup, setSetup] = useState({
		isSet: false,
		mode: 0,
		p1: {
			weight: 0,
			exp: 0,
			belt: ''
		},
		p2: {
			weight: 0,
			exp: 0,
			belt: ''
		},
		handicaps: [],
	});

	const setupInfo = (info) => {
		setSetup({...setup, info});
		console.log(setup);
	}

	return (
		<Box width="90vw" height="90vh">
			{!setup.isSet ?
				<Setup setupInfo={setupInfo} setup={setup} night={props.night} logged={props.logged} />
				:
				<Grid container spacing={3} direction="row" justify="space-between" alignItems="flex-start">
					<Grid item xs={12} md={9}>
						<Box display="flex" flexDirection="column">
							<Box mb={2}>
								<Paper className={classes.paper}>
									<Typography variant="h1" className={classes.timer}>10:00</Typography>
									<Box>
										[start] [stop] [reset]
									</Box>
								</Paper>
							</Box>
							<Box>
								<Paper className={classes.paper}>Fighters</Paper>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={3}>
						<Box>
							<Paper className={classes.paper}>
								Handicaps
							</Paper>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Menu night={props.night} logged={props.logged} />
					</Grid>
				</Grid>
			}
		</Box>
	);
}
