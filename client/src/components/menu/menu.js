import React from 'react';
import { Tooltip, Typography, Box, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReplayIcon from '@material-ui/icons/Replay';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { homeClick, startClick } from './navigation';
// import { GLogin } from '../auth/login';

export const ButtonMenu = ({night, user, logged, logout}) => {
	return (
			<Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
				<Box p={1}>
					<Tooltip title="Home" placement="top">
						{night ?
							<Typography><IconButton onClick={homeClick} color="inherit"><HomeIcon fontSize="large" /></IconButton></Typography> :
							<Typography><IconButton onClick={homeClick}><HomeIcon fontSize="large" /></IconButton></Typography>
						}
					</Tooltip>
				</Box>
				<Box p={1}>
					<Tooltip title="Reset" placement="top">
						{night ?
							<Typography><IconButton onClick={startClick} color="inherit"><ReplayIcon fontSize="large" /></IconButton></Typography> :
							<Typography><IconButton onClick={startClick}><ReplayIcon fontSize="large" /></IconButton></Typography>
						}
					</Tooltip>
				</Box>
				{logged ?
					<Box p={1}>
						<Tooltip title="Log out" placement="top">
							{night ?
								<Typography><IconButton onClick={() => logout()} color="inherit"><ExitToAppIcon fontSize="large" /></IconButton></Typography> :
								<Typography><IconButton onClick={() => logout()}><ExitToAppIcon fontSize="large" /></IconButton></Typography>
							}
						</Tooltip>
					</Box> :
					<Box p={1}>
						<Tooltip title="Log in" placement="top">
							{night ?
								<Typography><IconButton href="/api/auth/google" color="inherit"><AccountCircleIcon fontSize="large" /></IconButton></Typography> :
								<Typography><IconButton href="/api/auth/google" ><AccountCircleIcon fontSize="large" /></IconButton></Typography>
							}
							{/* <GLogin night={props.night} /> */}
						</Tooltip>
					</Box>
				}
			</Box>
		);
}
