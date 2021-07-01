import React from 'react';
import { Button, Grid, Paper, Tooltip, Typography, Box, Link } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReplayIcon from '@material-ui/icons/Replay';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStyles } from './styles/styles';
import { Menu } from './menu/menu';
import { Setup } from './setup';

export const Sparring = (props) => {
	const classes = useStyles({ night: props.night });

	return (
		<Box display="flex" flexDirection="column" height="95vh" p={1} width="100vw">
			<Box border={1} display="flex" flexDirection="row" justifyContent="center" height="90vh" textAlign="center">
				{/* <Setup/> */}
				<Grid container>
					<Grid item></Grid>
				</Grid>
				<Box width="75%" border={1}>
					<Box>Timer</Box>
					<Box>Fighters</Box>
				</Box>
				<Box width="25%" border={1}>
					Handicap
				</Box>
			</Box>
			<Menu night={props.night} logged={props.logged} />
		</Box>
	);
}
