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
		setHandicaps: false,
		players: [],
		handicaps: [],
		listPenalties: [],
		activePenalties: [],
	});
	const [points, setPoints] = useState(0);

	const setupInfo = (info) => {
		setSetup({ ...setup, info });
	}

	function calcHandicap() {
		let weightDif = 0;
		let expDif = 0;
		let weightAdv = 0;
		let expAdv = 0;
		if (setup.mode === 0) { // sparring mode
			if (setup.players.length >= 2) {
				if (setup.setHandicaps === true) {
					weightDif = setup.players[0].weight - setup.players[1].weight;
					if (weightDif < 0) {
						weightDif *= -1;
						weightAdv = 1;
					}
					weightDif = Math.round((weightDif / setup.handicaps[0].amount));
					weightDif *= setup.handicaps[0].pts;

					expDif = ((setup.players[0].expYr * 12) + setup.players[0].expMonth) - ((setup.players[1].expYr * 12) + setup.players[1].expMonth);
					if (expDif < 0) {
						expDif *= -1;
						expAdv = 1;
					}
					expDif = Math.round((expDif / setup.handicaps[1].amount));
					expDif *= setup.handicaps[1].pts;
				}
				if (weightAdv > 0 && expAdv > 0) {
					return setup.players[0].name + ' has ' + (weightDif + expDif) + ' points to spend';
				}
				if (weightAdv === 0 && expAdv === 0) {
					return setup.players[1].name + ' has ' + (weightDif + expDif) + ' points to spend';
				}
				if (expDif === weightDif && expAdv !== weightAdv) { // no advantage
					return 'No one has points to spend!';
				}
				if (weightDif > expDif) {
					return setup.players[expAdv].name + ' has ' + (weightDif - expDif) + ' points to spend';
				}
				if (expDif > weightDif) {
					return setup.players[weightAdv].name + ' has ' + (expDif - weightDif) + ' points to spend';
				}
			}
		}
	}

	return (
		<Box width="90vw">
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
								<Paper className={classes.paper}>
									{setup.players.length >= 2 &&
										<Box>
											<Box flexGrow="1" mb={1}>{calcHandicap()}</Box>
											<Box display="flex" flexDirection="row" justifyContent="center" whiteSpace="space-around">
												<Box flexGrow="1">
													<Typography variant="h2">{setup.players[0].name}</Typography>
													{/* <Button onClick={() => calcHandicap()}>test</Button> */}
												</Box>
												<Box>
													<Typography variant="h2">vs</Typography>
												</Box>
												<Box flexGrow="1">
													<Typography variant="h2">{setup.players[1].name}</Typography>
												</Box>
											</Box>
										</Box>
									}
								</Paper>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={3}>
						<Box>
							<Paper className={classes.paperHandicap}>
								<Typography variant="h5">Handicaps</Typography>
								{setup.listPenalties.map((p, index) => {
									return (
										<Box key={index}>
											{p.desc}
										</Box>
									)
								})}
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
