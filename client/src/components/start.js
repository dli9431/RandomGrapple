import React from 'react';
import { Button, Grid, Paper, Box } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Menu } from './menu/menu.js';
import { useStyles } from './styles/styles.js';
import { sparClick, tournClick, timerClick } from './menu/navigation.js';

export const Start = (props) => {
	const classes = useStyles({ night: props.night });

	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw">
			<Box display="flex" flexDirection="row" justifyContent="center" height="90vh" textAlign="center">
				<Grid container spacing={3}>
					<Grid item xs={12} md={4}>
						<Paper className={classes.paper}>
							<Box display="flex" justifyContent="center" flexDirection="column" height="100%">
								<Button onClick={sparClick} variant="outlined" fontSize="large" color={props.night ? 'secondary' : 'primary'} endIcon={<PlayArrowIcon />}>
									Sparring Mode
								</Button>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper className={classes.paper}>
							<Box display="flex" justifyContent="center" flexDirection="column" height="100%">
								<Button onClick={tournClick} variant="outlined" fontSize="large" color={props.night ? 'secondary' : 'primary'} endIcon={<PlayArrowIcon />}>
									Tournament Mode
								</Button>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper className={classes.paper}>
							<Box display="flex" justifyContent="center" flexDirection="column" height="100%">
								<Button onClick={timerClick} variant="outlined" fontSize="large" color={props.night ? 'secondary' : 'primary'} endIcon={<PlayArrowIcon />}>
									Timer
								</Button>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<Menu logged={props.logged} night={props.night} />
		</Box>
	);
}
