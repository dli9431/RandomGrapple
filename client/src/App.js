import React, { useState } from 'react';
import { Router, navigate } from '@reach/router';
import { Button, Switch, Typography, Box } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeProvider } from 'styled-components';
import { light, dark } from './themes/theme';
import { GlobalStyles } from './themes/global';
import { useDarkMode } from './themes/useDarkMode';
import { Start } from './components/start';
import { Sparring } from './components/sparring';
import { Tournament } from './components/tournament';
import { Timer } from './components/timer';
import { startClick } from './components/menu/navigation';

function App() {
	const [theme, handleChange, componentMounted, night] = useDarkMode();
	const themeMode = theme === 'light' ? light : dark;
	const [logged, setLogged] = useState(false);

	// useEffect(() => {
	// 	fetch('/api')
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// })

	const loginFn = () => {
		setLogged(true);
	}

	const logoutFn = () => {
		setLogged(false);
	}

	if (!componentMounted) {
		return <div />
	};

	const Home = () => {
		return (
			<Box>
				<Typography align="center" style={{ fontSize: "2em", wordBreak: "break-word" }}>RandomGrapple</Typography>
				<Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
					<Box p={1}>
						<Button onClick={startClick} variant="contained" color={night ? 'secondary' : 'primary'} startIcon={<PlayArrowIcon />}>Start</Button>
					</Box>
					<Box p={1}>
						{logged ?
							<Button variant="contained" color={night ? 'secondary' : 'primary'} onClick={logoutFn} startIcon={<ExitToAppIcon />}>Logout</Button>
							:
							<Button variant="contained" color={night ? 'secondary' : 'primary'} onClick={loginFn} startIcon={<AccountCircleIcon />}>Login</Button>
						}
					</Box>
				</Box>
			</Box>
		);
	}

	return (
		<ThemeProvider theme={themeMode}>
			<GlobalStyles />
			<Router>
				<Home path="/" />
				<Start path="start" logged={logged} night={night} />
				<Sparring path="sparring" logged={logged} night={night} />
				<Tournament path="tournament" logged={logged} night={night} />
				<Timer path="timer" logged={logged} night={night} />
			</Router>
			<Box display="flex" flexDirection="row" justifyContent="center">
				<Switch
					checked={night}
					onChange={handleChange}
					name="night"
				/>
				<Brightness4Icon fontSize="large" />
			</Box>
		</ThemeProvider>
	);
}

export default App;
