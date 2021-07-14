import React from 'react';
import { Box } from '@material-ui/core';
import { Menu } from './menu/menu';

export const Tournament = ({ night, user, logged, logout }) => {
	// const classes = useStyles({ night: night });

	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw">
			<Box display="flex" flexDirection="row" justifyContent="center" height="90vh" textAlign="center">
				Tournament Mode
			</Box>
			<Menu logged={logged} night={night} logout={logout} />
		</Box>
	);
}
