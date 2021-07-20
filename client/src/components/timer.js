import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, IconButton, Typography, Box, TextField } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { regStyles } from './styles/styles';
import { Menu } from './menu/menu';

export const MatchPoints = ({ night, points, setPoints }) => {
	function add() {

	}
	function remove() {

	}

	return (
		<Box m={0} p={0}>
			<Box m={0} p={0}>
				<IconButton onClick={(e) => add()} size="small" color={night ? "secondary" : "primary"}>
					<AddIcon fontSize="small" />
				</IconButton>
				Points
				<IconButton onClick={(e) => remove()} size="small" color={night ? "secondary" : "primary"}>
					<RemoveIcon fontSize="small" />
				</IconButton>
			</Box>
			<Box m={0} p={0}>
				<IconButton onClick={(e) => add()} size="small" color={night ? "secondary" : "primary"}>
					<AddIcon fontSize="small" />
				</IconButton>
				Adv
				<IconButton onClick={(e) => remove()} size="small" color={night ? "secondary" : "primary"}>
					<RemoveIcon fontSize="small" />
				</IconButton>
			</Box>
			<Box m={0} p={0}>
				<IconButton onClick={(e) => add()} size="small" color={night ? "secondary" : "primary"}>
					<AddIcon fontSize="small" />
				</IconButton>
				Penalty
				<IconButton onClick={(e) => remove()} size="small" color={night ? "secondary" : "primary"}>
					<RemoveIcon fontSize="small" />
				</IconButton>
			</Box>
		</Box>
	);
}

export const Timer = ({ night, user, logged, logout, only, player1, player2, match, matchInfo }) => {
	const classes = regStyles({ night: night });
	const [running, setRunning] = useState(false);
	const [mins, setMins] = useState(0);
	const [secs, setSecs] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [p1, setP1] = useState({
		points: [],
		adv: [],
		penalty: []
	});
	const [p2, setP2] = useState({
		points: [],
		adv: [],
		penalty: []
	});

	if (player1 !== null && player1 !== undefined) {
		match.players.p1 = player1;
	}
	if (player2 !== null && player2 !== undefined) {
		match.players.p2 = player2;
	}

	function str_pad_left(string, pad, length) {
		return (new Array(length + 1).join(pad) + string).slice(-length);
	}
	var finalTime = str_pad_left(Math.floor(timeLeft / 60), '0', 2) + ':' + str_pad_left(timeLeft - Math.floor(timeLeft / 60) * 60, '0', 2);

	useEffect(() => {
		if (running) {
			const timer = setInterval(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			if (timeLeft === 0) {
				setRunning(false);
			}
			return () => clearInterval(timer);
		}
	}, [timeLeft, running]);

	function runTimer() {
		if (timeLeft > 0) { // restart
			setRunning(true);
		} else {
			setTimeLeft(parseInt(mins) * 60 + parseInt(secs));
			setRunning(true);
		}
	}

	function stopTimer() {
		if (running === false) { // restart
			setTimeLeft(mins * 60 + secs);
		}
		setRunning(false);
	}

	function reset() {
		setTimeLeft(mins * 60 + secs);
		setRunning(true);
	}

	function parseTimeInputs(e, mins) {
		if (mins) {
			if (e.target.value.length === 0) {
				setMins(0);
			} else {
				setMins(parseInt(e.target.value))
			}
		} else {
			if (e.target.value.length === 0) {
				setSecs(0);
			} else {
				setSecs(parseInt(e.target.value))
			}
		}
	}

	if (only === false) {
		return (
			<Box textAlign="center">
				{(running || timeLeft >= 0) &&
					<Typography variant="h1" className={classes.timer}>{finalTime}</Typography>
				}

				<TextField value={mins} onChange={(e) => parseTimeInputs(e, true)} type="number" label="Minutes" variant="outlined" />
				<TextField value={secs} onChange={(e) => parseTimeInputs(e, false)} type="number" label="Seconds" variant="outlined" />
				<Box display="flex" flexDirection="row" justifyContent="center" mt={1}>
					{!running ?
						<Box><Button onClick={() => runTimer()} variant="contained" color={night ? "secondary" : "primary"} startIcon={<PlayArrowIcon />}>Start</Button></Box>
						:
						<Box><Button onClick={() => reset()} variant="contained" color={night ? "secondary" : "primary"} startIcon={<ReplayIcon />}>Reset</Button></Box>
					}
					<Box ml={1}><Button onClick={() => stopTimer()} variant="contained" color={night ? "secondary" : "primary"} startIcon={<StopIcon />}>Stop</Button></Box>
				</Box>
				<Box display="flex" flexDirection="row" justifyContent="space-between" mt={2}>
					{(player1 !== null && player1 !== undefined) &&
						<Box display="flex" flexDirection="row" className={classes.score}>
							<Box>
								{player1.name}
								<MatchPoints night={night} />
							</Box>
							<Box className={classes.scoreNum} display="flex" flexDirection="row" justifyContent="center" mr={2}>
							<Box alignSelf="center" p={1}>
									<Typography variant="h1">0</Typography>
								</Box>
								<Box display="flex" flexDirection="column" justifyContent="center">
									<Box bgcolor="green" p={1}>
										<Typography variant="h5">0</Typography>
									</Box>
									<Box bgcolor="red" p={1}>
										<Typography variant="h5">0</Typography>
									</Box>
								</Box>
							</Box>
						</Box>
					}
					{(player2 !== null && player2 !== undefined) &&
						<Box display="flex" flexDirection="row" className={classes.score}>
							<Box className={classes.scoreNum} display="flex" flexDirection="row" justifyContent="center" mr={2}>
								<Box alignSelf="center" p={1}>
									<Typography variant="h1">0</Typography>
								</Box>
								<Box display="flex" flexDirection="column" justifyContent="center">
									<Box bgcolor="green" p={1}>
										<Typography variant="h5">0</Typography>
									</Box>
									<Box bgcolor="red" p={1}>
										<Typography variant="h5">0</Typography>
									</Box>
								</Box>
							</Box>
							<Box>
								{player2.name}
								<MatchPoints night={night} />
							</Box>
						</Box>
					}
				</Box>
			</Box>
		)
	} else {
		return (
			<Box width="90vw" height="65vh" display="flex" flexDirection="column" justifyContent="flex-end">
				<Grid container spacing={3} direction="row" justify="space-between" alignItems="flex-start">
					<Grid item xs={12}>
						<Box display="flex" flexDirection="column">
							<Box mb={2}>
								<Paper className={classes.paper}>
									<Box textAlign="center">
										{(running || timeLeft >= 0) &&
											<Typography variant="h1" className={classes.timer}>{finalTime}</Typography>
										}

										<TextField value={mins} onChange={(e) => parseTimeInputs(e, true)} type="number" label="Minutes" variant="outlined" />
										<TextField value={secs} onChange={(e) => parseTimeInputs(e, false)} type="number" label="Seconds" variant="outlined" />
										<Box display="flex" flexDirection="row" justifyContent="center" mt={1}>
											{!running ?
												<Box><Button onClick={() => runTimer()} variant="contained" color={night ? "secondary" : "primary"} startIcon={<PlayArrowIcon />}>Start</Button></Box>
												:
												<Box><Button onClick={() => reset()} variant="contained" color={night ? "secondary" : "primary"} startIcon={<ReplayIcon />}>Reset</Button></Box>
											}
											<Box ml={1}><Button onClick={() => stopTimer()} variant="contained" color={night ? "secondary" : "primary"} startIcon={<StopIcon />}>Stop</Button></Box>
										</Box>
									</Box>
								</Paper>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Menu logged={logged} night={night} logout={logout} />
					</Grid>
				</Grid>
			</Box>
		);
	}
}
