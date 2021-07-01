import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Tooltip, Typography, Box, Link } from '@material-ui/core';
import { Menu } from './menu/menu';
import { useStyles } from './styles/styles';

export const Tournament = (props) => {
	const classes = useStyles({ night: props.night });
	
	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw">
			<Box display="flex" flexDirection="row" justifyContent="center" height="90vh" textAlign="center">
				Tournament Mode
			</Box>
			<Menu night={props.night} logged={props.logged}/>
		</Box>
	);
}
