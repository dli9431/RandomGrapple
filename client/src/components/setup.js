import React from 'react';
import { Button, Grid, Paper, Tooltip, Typography, Box, Link } from '@material-ui/core';
import { useStyles } from './styles/styles';
import { Menu } from './menu/menu';

export const Setup = (props) => {
	
	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw">
			<Box display="flex" flexDirection="row" justifyContent="center" height="90vh" textAlign="center">
				Setup<br/>
				[Import]<br/>
				[Next]
			</Box>
			<Menu night={props.night} logged={props.logged}/>
		</Box>
	);
}
