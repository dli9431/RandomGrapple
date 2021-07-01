import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Tooltip, Typography, Box, Link } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReplayIcon from '@material-ui/icons/Replay';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useStyles } from './styles/styles';
import { Menu } from './menu/menu';

export const Timer = (props) => {
	const classes = useStyles({ night: props.night });

	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw">
			<Box display="flex" flexDirection="row" justifyContent="center" height="90vh" textAlign="center">
				Timer
			</Box>
			<Menu night={props.night} logged={props.logged}/>
		</Box>
	);
}
