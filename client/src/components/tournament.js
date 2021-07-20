import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography, Box } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { regStyles } from "./styles/styles";
import { ButtonMenu } from "./menu/menu";
import { Setup } from "./setup";
import { Timer } from "./timer";
import { HandicapCheckList, calcHandicapText } from "./setup/setupPage";


export const Tournament = ({ night, user, logged, logout, updateUser }) => {
	const classes = regStyles({ night: night });
	const [setup, setSetup] = useState({
		isSet: false,
		mode: 0,
		setHandicaps: false,
		players: [],
		handicaps: [],
		listPenalties: [],
		gymAvg: {}
	});

	const [usedPoints, setUsedPoints] = useState(0);
	const [formInfo, setFormInfo] = useState([]);
	const [finished, setFinished] = useState(false);
	const [finalPenalties, setFinalPenalties] = useState([]);
	const [player1, setPlayer1] = useState(setup.players[0]);
	const [player2, setPlayer2] = useState(setup.players[1]);

	useEffect(() => {
		function init() {
			let info = [];
			if (setup.listPenalties.length > 0) {
				for (var i = 0; i < setup.listPenalties.length; i++) {
					if (setup.listPenalties[i][0].limit === 1) {
						info.push({ "index": -1, "points": 0 });
					} else {
						info.push([]);
					}
				}
			}
			setFormInfo(info);
		}
		if (finished === false) {
			init();
		}
	}, [setup.listPenalties, finished])

	const setupInfo = (info) => {
		setSetup({ ...setup, info });
	}
	

	return (
		<Box display="flex" flexDirection="column" height="90vh" p={1} width="90vw">
			<Box display="flex" flexDirection="row" justifyContent="center" height="90vh" textAlign="center">
				Tournament Mode
			</Box>
			<ButtonMenu logged={logged} night={night} logout={logout} />
		</Box>
	);
}
