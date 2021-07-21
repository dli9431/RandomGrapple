import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Paper, Grid, Button, IconButton, Typography, Box, TextField } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import { regStyles } from './styles/styles';
import { ButtonMenu } from './menu/menu';
import { PlayerSearchBox } from './setup/setupPage';

export const MatchPoints = ({ night, matchScore, player, time }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [removeAnchorEl, setRemoveAnchorEl] = useState(null);

	function add(points, adv, penalty) {
		if (points > 0) {
			const temp = { time: time, points: points };
			player.points.push(temp);
		}
		if (adv > 0) {
			const temp = { time: time, adv: adv };
			player.adv.push(temp);
			
		}
		if (penalty > 0) {
			const temp = { time: time, penalty: penalty };
			player.penalty.push(temp);
		}
		matchScore(player);
	}
	function remove(points, adv, penalty) {
		if (points > 0) {
			for (var i = player.points.length - 1; i >= 0; i--) {
				if (player.points[i].points === points) {
					player.points.splice(i, 1);
				}
			}
		}
		if (adv > 0) {
			player.adv.pop();
		}
		if (penalty > 0) {
			player.penalty.pop();
		}
		matchScore(player);
	}

	const pointsClick = (e) => {
		setAnchorEl(e.currentTarget);
	}

	const pointsClose = (pts) => {
		setAnchorEl(null);
		if (pts > 0) {
			add(pts, 0, 0);
		}
	}

	const removeClick = (e) => {
		setRemoveAnchorEl(e.currentTarget);
	}

	const removeClose = (pts) => {
		setRemoveAnchorEl(null);
		if (pts > 0) {
			remove(pts, 0, 0);
		}
	}

	return (
		<Box m={0} p={0}>
			<Box m={0} p={0}>
				<IconButton onClick={(e) => pointsClick(e)} size="small" color={night ? "secondary" : "primary"}>
					<AddIcon fontSize="small" />
				</IconButton>
				<Menu
					id="add-points-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={pointsClose}
				>
					<MenuItem onClick={() => pointsClose(2)}>+2</MenuItem>
					<MenuItem onClick={() => pointsClose(3)}>+3</MenuItem>
					<MenuItem onClick={() => pointsClose(4)}>+4</MenuItem>
				</Menu>
				Points
				<IconButton onClick={(e) => removeClick(e)} size="small" color={night ? "secondary" : "primary"}>
					<RemoveIcon fontSize="small" />
				</IconButton>
				<Menu
					id="remove-points-menu"
					anchorEl={removeAnchorEl}
					keepMounted
					open={Boolean(removeAnchorEl)}
					onClose={removeClose}
				>
					<MenuItem onClick={() => removeClose(2)}>-2</MenuItem>
					<MenuItem onClick={() => removeClose(3)}>-3</MenuItem>
					<MenuItem onClick={() => removeClose(4)}>-4</MenuItem>
				</Menu>
			</Box>
			<Box m={0} p={0}>
				<IconButton onClick={(e) => add(0, 1, 0)} size="small" color={night ? "secondary" : "primary"}>
					<AddIcon fontSize="small" />
				</IconButton>
				Adv
				<IconButton onClick={(e) => remove(0, 1, 0)} size="small" color={night ? "secondary" : "primary"}>
					<RemoveIcon fontSize="small" />
				</IconButton>
			</Box>
			<Box m={0} p={0}>
				<IconButton onClick={(e) => add(0, 0, 1)} size="small" color={night ? "secondary" : "primary"}>
					<AddIcon fontSize="small" />
				</IconButton>
				Penalty
				<IconButton onClick={(e) => remove(0, 0, 1)} size="small" color={night ? "secondary" : "primary"}>
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
		player: 1,
		points: [],
		adv: [],
		penalty: []
	});
	const [p2, setP2] = useState({
		player: 2,
		points: [],
		adv: [],
		penalty: []
	});
	const [displayP1, setDisplayP1] = useState({
		points: 0,
		adv: 0,
		penalty: 0
	});
	const [displayP2, setDisplayP2] = useState({
		points: 0,
		adv: 0,
		penalty: 0
	})
	const [finishMethod, setFinishMethod] = useState('');
	const [winner, setWinner] = useState('');

	if (player1 !== null && player1 !== undefined) {
		match.players.p1 = player1;
	}
	if (player2 !== null && player2 !== undefined) {
		match.players.p2 = player2;
	}

	function tally(player, pointsType) {
		let temp = 0;
		switch (pointsType) {
			case 'points':
				if (player.points.length > 0) {
					for (var i = 0; i < player.points.length; i++) {
						temp += player.points[i].points;
					}
				}
				break;
			case 'adv':
				if (player.adv.length > 0) {
					for (var j = 0; j < player.adv.length; j++) {
						temp += player.adv[j].adv;
					}
				}
				break;
			case 'penalty':
				if (player.penalty.length > 0) {
					for (var k = 0; k < player.penalty.length; k++) {
						temp += player.penalty[k].penalty;
					}
				}
				break;
			default:
				break;
		}
		return temp;
	}

	function matchScore(score) {
		if (score.player === 1) {
			setP1({ ...p1, score });
			const ppts = tally(p1, 'points');
			const padv = tally(p1, 'adv');
			const ppen = tally(p1, 'penalty');
			const showPts = { points: ppts, adv: padv, penalty: ppen };
			setDisplayP1(showPts);
		} else {
			setP2({ ...p2, score });
			const ppts = tally(p2, 'points');
			const padv = tally(p2, 'adv');
			const ppen = tally(p2, 'penalty');
			const showPts = { points: ppts, adv: padv, penalty: ppen };
			setDisplayP2(showPts);
		}
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
		match.initTime = (mins * 60) + secs;
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

	function parseTimeInputs(e, minsBool) {
		if (minsBool) {
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

	function finishMatch() {
		match.endTime = timeLeft;
		match.winner = winner;
		match.winMethod = finishMethod;
		match.p1Score = p1;
		match.p2Score = p2;
		matchInfo(match);
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
								<MatchPoints night={night} matchScore={matchScore} player={p1} time={timeLeft} />
							</Box>
							<Box className={classes.scoreNum} display="flex" flexDirection="row" justifyContent="center" mr={2}>
								<Box alignSelf="center" p={1}>
									<Typography variant="h1">{displayP1.points}</Typography>
								</Box>
								<Box display="flex" flexDirection="column" justifyContent="center">
									<Box bgcolor="green" p={1}>
										<Typography variant="h5">{displayP1.adv}</Typography>
									</Box>
									<Box bgcolor="red" p={1}>
										<Typography variant="h5">{displayP1.penalty}</Typography>
									</Box>
								</Box>
							</Box>
						</Box>
					}
					{(player2 !== null && player2 !== undefined) &&
						<Box display="flex" flexDirection="row" className={classes.score}>
							<Box className={classes.scoreNum} display="flex" flexDirection="row" justifyContent="center" mr={2}>
								<Box alignSelf="center" p={1}>
									<Typography variant="h1">{displayP2.points}</Typography>
								</Box>
								<Box display="flex" flexDirection="column" justifyContent="center">
									<Box bgcolor="green" p={1}>
										<Typography variant="h5">{displayP2.adv}</Typography>
									</Box>
									<Box bgcolor="red" p={1}>
										<Typography variant="h5">{displayP2.penalty}</Typography>
									</Box>
								</Box>
							</Box>
							<Box>
								{player2.name}
								<MatchPoints night={night} matchScore={matchScore} player={p2} time={timeLeft} />
							</Box>
						</Box>
					}
				</Box>
				{
					(player1 !== null && player1 !== undefined && player2 !== null && player2 !== undefined) &&
					<Box mt={3}>
						<Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
							<Grid item xs={12} sm={6} md={5}>
								<PlayerSearchBox players={match.players} player={winner} setPlayer={setWinner} id={0} />
							</Grid>
							<Grid item xs={12} sm={6} md={5}>
								<TextField fullWidth={true} size="small" value={finishMethod} onChange={(e) => setFinishMethod(e.target.value)} label="Win method" variant="outlined" />
							</Grid>
							<Grid item xs={12} sm={6} md={2}>
								<Button onClick={() => finishMatch()} variant="contained" color={night ? "secondary" : "primary"} startIcon={<DoneIcon />}>Finish</Button>
							</Grid>
						</Grid>
					</Box>
				}
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
						<ButtonMenu logged={logged} night={night} logout={logout} />
					</Grid>
				</Grid>
			</Box>
		);
	}
}
