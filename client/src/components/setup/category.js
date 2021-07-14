import React from 'react';
import { Box } from '@material-ui/core';

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