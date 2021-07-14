import React from 'react';
import { Button, Grid, Paper, Box } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Menu } from './menu/menu.js';
import { useStyles } from './styles/styles.js';
import { sparClick, /*tournClick,*/ timerClick } from './menu/navigation.js';

export const Start = ({night, user, logged, logout}) => {
	const classes = useStyles({ night: night });
		
	return (
		<Box display="flex" flexDirection="column" p={1} width="90vw" height="65vh" justifyContent="flex-end">
			<Box display="flex" flexDirection="row" textAlign="center" justifyContent="center">
				<Grid container spacing={3}>
					<Grid item xs={12} md={4}>
						<Paper className={classes.paper}>
							<Box display="flex" justifyContent="center" flexDirection="column" height="100%">
								<Button onClick={sparClick} variant="contained" fontSize="large" color={night ? 'secondary' : 'primary'} endIcon={<PlayArrowIcon />}>
									Sparring Mode
								</Button>
							</Box>
						</Paper>
					</Grid>
					{/* <Grid item xs={12} md={4}>
						<Paper className={classes.paper}>
							<Box display="flex" justifyContent="center" flexDirection="column" height="100%">
								<Button onClick={tournClick} variant="contained" fontSize="large" color={props.night ? 'secondary' : 'primary'} endIcon={<PlayArrowIcon />}>
									Tournament Mode
								</Button>
							</Box>
						</Paper>
					</Grid> */}
					<Grid item xs={12} md={4}>
						<Paper className={classes.paper}>
							<Box display="flex" justifyContent="center" flexDirection="column" height="100%">
								<Button onClick={timerClick} variant="contained" fontSize="large" color={night ? 'secondary' : 'primary'} endIcon={<PlayArrowIcon />}>
									Timer
								</Button>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<Menu logged={logged} night={night} logout={logout}/>
		</Box>
	);
}
