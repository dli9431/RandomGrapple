import React, { useState, useEffect } from 'react';
import { FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Checkbox, Grid, Paper, Typography, Box } from '@material-ui/core';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';
import { Setup } from './setup';
import { Timer } from './timer';

export const HandicapCheckList = ({ usedPoints, checkedInfo, night, penalties, radioChecked }) => {
	const [handicaps, setHandicaps] = useState(radioChecked);
	const [render, setRender] = useState(false);
	const handleChange = (event, index) => {
		if (event.target.value === "none") {
			radioChecked[index] = "none";
		} else {
			radioChecked[index] = parseInt(event.target.value);
		}
		setHandicaps(radioChecked);

		if (render) {
			setRender(false);
		} else {
			setRender(true);
		}

		let pts = parseInt(event.target.name.split("-")[1]);
		
		if (pts !== undefined) {
			if (!isNaN(pts)) {
				if (event.target.value !== "none") {
					usedPoints += pts;
				} else {
					usedPoints -= pts;
				}
			}
		}

		// console.log(usedPoints);
		// if (isNaN(event.target.value)) {
		// 	usedPoints += pts;
		// } else {
		// 	usedPoints -= pts;
		// }
		// console.log(usedPoints);
		return checkedInfo(handicaps, usedPoints);
	};

	// const handleChange = (event) => {
	// 	// parse checkedinfo
	// 	let index = parseInt(event.target.name.split("-")[0]);
	// 	let pts = parseInt(event.target.name.split("-")[1]);
	// 	if (event.target.checked) {
	// 		usedPoints += pts;
	// 	} else {
	// 		usedPoints -= pts;
	// 	}
	// 	return checkedInfo(index, event.target.checked, usedPoints);
	// };

	return (
		<Box>
			{
				// setup.listPenalties.map(sub => sub.map((p, index) => {
				penalties.map((sub, index) => {
					return (
						<Box key={index}>
							<FormControl component="fieldset">
								<FormLabel focused={true} color={night ? "secondary" : "primary"} component="legend">{sub[0].type}</FormLabel>
								<RadioGroup aria-label="" name="" defaultValue="none" value={handicaps[index]} onChange={(e) => handleChange(e, index)}>
									<FormControlLabel key={-1} value="none" control={<Radio />} label="None" />
									{sub.map((p, i) => {
										return (
											<FormControlLabel name={i + "-" + sub[i].pts} key={i} value={i} control={<Radio />} label={"[" + sub[i].pts + "] " + sub[i].desc} />
										)
									})
									}
								</RadioGroup>

								{/* <FormControlLabel value="female" control={<Radio />} label="Female" />
									<FormControlLabel value="male" control={<Radio />} label="Male" />
									<FormControlLabel value="other" control={<Radio />} label="Other" />
									<FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}

							</FormControl>
						</Box>
					)
				})

				// penalties.map((p, index) => {
				// 	return (
				// 		<Box key={index}>
				// 			<FormControlLabel
				// 				control={
				// 					<Checkbox
				// 						onChange={handleChange}
				// 						name={index + "-" + p.pts}
				// 						color={night ? "secondary" : "primary"}
				// 					/>
				// 				}
				// 				label={"[" + p.pts + "] " + p.desc}
				// 			/>
				// 		</Box>
				// 	)
				// })
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

	let radioChecked = [];
	if (setup.listPenalties.length > 0) {
		for (var i = 0; i < setup.listPenalties.length; i++) {
			radioChecked.push("none");
		}
	}

	const [points, setPoints] = useState(0);
	const [usedPoints, setUsedPoints] = useState(0);
	const [checked, setChecked] = useState([]);

	// console.log(usedPoints);

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
						return setup.players[expAdv].name + ' has ' + (usedPoints > 0 ? (weightDif - expDif) - usedPoints : weightDif - expDif) + ' points to spend';
					}
					if (expDif > weightDif) {
						setPoints(expDif - weightDif);
						return setup.players[weightAdv].name + ' has ' + (usedPoints > 0 ? (expDif - weightDif) - usedPoints : expDif - weightDif) + ' points to spend';
					}
				}
			}
			return null;
		}
	}

	function checkedInfo(radioChecked, usedPts) {
		console.log(radioChecked);
		console.log(usedPts);

		
		// setUsedPoints(usedPts);
		// setChecked(setup.listPenalties[index].checked = checked);
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
									<HandicapCheckList radioChecked={radioChecked} usedPoints={usedPoints} checkedInfo={checkedInfo} night={props.night} penalties={setup.listPenalties} />
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
