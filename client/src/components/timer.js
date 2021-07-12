import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, Typography, Box, TextField } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { useStyles } from './styles/styles';
import { Menu } from './menu/menu';

export const Timer = (props) => {
	const classes = useStyles({ night: props.night });
	const [running, setRunning] = useState(false);
	const [mins, setMins] = useState(0);
	const [secs, setSecs] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);

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

	if (props.only === false) {
		return (
			<Box textAlign="center">
				{(running || timeLeft >= 0) &&
					<Typography variant="h1" className={classes.timer}>{finalTime}</Typography>
				}

				<TextField value={mins} onChange={(e) => parseTimeInputs(e, true)} type="number" label="Minutes" variant="outlined" />
				<TextField value={secs} onChange={(e) => parseTimeInputs(e, false)} type="number" label="Seconds" variant="outlined" />
				<Box display="flex" flexDirection="row" justifyContent="center" mt={1}>
					{!running ?
						<Box><Button onClick={() => runTimer()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<PlayArrowIcon />}>Start</Button></Box>
						:
						<Box><Button onClick={() => reset()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<ReplayIcon />}>Reset</Button></Box>
					}
					<Box ml={1}><Button onClick={() => stopTimer()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<StopIcon />}>Stop</Button></Box>
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
												<Box><Button onClick={() => runTimer()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<PlayArrowIcon />}>Start</Button></Box>
												:
												<Box><Button onClick={() => reset()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<ReplayIcon />}>Reset</Button></Box>
											}
											<Box ml={1}><Button onClick={() => stopTimer()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<StopIcon />}>Stop</Button></Box>
										</Box>
									</Box>
								</Paper>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Menu night={props.night} logged={props.logged} />
					</Grid>
				</Grid>
			</Box>
		);
	}
}
