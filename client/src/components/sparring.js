import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Grid, Paper, Typography, Box } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';
import { Setup } from './setup';
import { Timer } from './timer';

export const HandicapCheckList = ({ points, usedPoints, checkedInfo, checked, night, penalties }) => {
	const handleChange = (event) => {
		// parse checkedinfo
		let index = parseInt(event.target.name.split("-")[0]);
		let pts = parseInt(event.target.name.split("-")[1]);
		if (event.target.checked) {
			usedPoints += pts;
		} else {
			usedPoints -= pts;
		}
		return checkedInfo(index, event.target.checked, usedPoints);
	};

	return (
		<Box>
			{
				penalties.map((p, index) => {
					return (
						<Box key={index}>
							<FormControlLabel
								control={
									<Checkbox
										// checked={state.checkedB}
										onChange={handleChange}
										name={index + "-" + p.pts}
										// disabled={points < usedPoints ? true : false}
										color={night ? "secondary" : "primary"}
									/>
								}
								label={"[" + p.pts + "] " + p.desc}
							/>
						</Box>
					)
				})
			}
		</Box>
	);
}

export const Sparring = (props) => {
	const classes = regStyles({ night: props.night });
	const [setup, setSetup] = useState({
		isSet: false,
		mode: 0,
		setHandicaps: false,
		players: [],
		handicaps: [],
		listPenalties: [],
		// activePenalties: [],
	});

	const [points, setPoints] = useState(0);
	const [usedPoints, setUsedPoints] = useState(0);
	const [checked, setChecked] = useState([]);

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
				if (setup.setHandicaps === false) {
					return;
				}
				else {
					if (weightAdv > 0 && expAdv > 0) {
						setPoints(weightDif + expDif);
						return setup.players[0].name + ' has ' + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + ' points to spend';
					}
					if (weightAdv === 0 && expAdv === 0) {
						setPoints(weightDif + expDif);
						return setup.players[1].name + ' has ' + (usedPoints > 0 ? (weightDif + expDif) - usedPoints : weightDif + expDif) + ' points to spend';
					}
					if (expDif === weightDif && expAdv !== weightAdv) { // no advantage
						setPoints(0);
						return 'No one has points to spend!';
					}
					if (weightDif > expDif) {
						setPoints(weightDif - expDif);
						return setup.players[expAdv].name + ' has ' + (weightDif - expDif) + ' points to spend';
					}
					if (expDif > weightDif) {
						setPoints(expDif - weightDif);
						return setup.players[weightAdv].name + ' has ' + (expDif - weightDif) + ' points to spend';
					}
				}
			}
			return null;
		}
	}

	function checkedInfo(index, checked, usedPts) {
		setUsedPoints(usedPts);
		setChecked(setup.listPenalties[index].checked = checked);
	}

	return (
		<Box width="90vw">
			{!setup.isSet ?
				<Setup setupInfo={setupInfo} setup={setup} night={props.night} logged={props.logged} />
				:
				<Grid container spacing={3} direction="row" justify="space-between" alignItems="flex-start">
					<Grid item xs={12} md={setup.setHandicaps === true ? 9 : 12}>
						<Box display="flex" flexDirection="column">
							<Box mb={2}>
								<Paper className={classes.paper}>
									<Timer night={props.night} only={false} />
								</Paper>
							</Box>
							{setup.players.length >= 2 &&
								<Box>
									<Paper className={classes.paper}>
										<Box>
											<Box display="flex" flexDirection="row" justifyContent="center" whiteSpace="space-around">
												<Box flexGrow="1">
													<Typography variant="h5">{setup.players[0].name}</Typography>
												</Box>
												<Box>
													<Typography variant="h5">vs</Typography>
												</Box>
												<Box flexGrow="1">
													<Typography variant="h5">{setup.players[1].name}</Typography>
												</Box>
											</Box>
										</Box>
									</Paper>
								</Box>
							}
						</Box>
					</Grid>
					{
						setup.setHandicaps &&
						<Grid item xs={12} md={3}>
							<Box>
								<Paper className={classes.paperHandicap}>
									<Typography variant="h5">Handicaps</Typography>
									<Box flexGrow="1" mb={1}>{() => calcHandicap()}</Box>
									<HandicapCheckList points={points} usedPoints={usedPoints} checkedInfo={checkedInfo} night={props.night} checked={checked} penalties={setup.listPenalties} />
								</Paper>
							</Box>
						</Grid>
					}
					<Grid item xs={12}>
						<Menu night={props.night} logged={props.logged} />
					</Grid>
				</Grid>
			}
		</Box>
	);
}
