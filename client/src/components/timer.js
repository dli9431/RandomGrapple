import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, TextField } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { useStyles } from './styles/styles';

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
		setRunning(false);
	}

	function reset() {
		setTimeLeft(mins*60 + secs);
		setRunning(true);
	}

	return (
		<Box>
			{(running || timeLeft >= 0) &&
				<Typography variant="h1" className={classes.timer}>{finalTime}</Typography>
			}

			<TextField value={mins} onChange={(e) => setMins(parseInt(e.target.value))} type="number" label="Minutes" variant="outlined" />
			<TextField value={secs} onChange={(e) => setSecs(parseInt(e.target.value))} type="number" label="Seconds" variant="outlined" />
			<Box display="flex" flexDirection="row" justifyContent="center" mt={1}>
				{!running ?
					<Box><Button onClick={() => runTimer()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<PlayArrowIcon />}>Start</Button></Box>
					:
					<Box><Button onClick={() => reset()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<ReplayIcon />}>Reset</Button></Box>
				}
				<Box ml={1}><Button onClick={() => stopTimer()} variant="contained" color={props.night ? "secondary" : "primary"} startIcon={<StopIcon />}>Stop</Button></Box>
			</Box>
		</Box>
	);
}
