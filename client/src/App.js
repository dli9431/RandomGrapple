import React, { useState } from 'react';
import { Router } from '@reach/router';
import { Button, Switch, Typography, Box } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
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
import { GLogin } from './components/auth/login';
import { useLocation } from '@reach/router';

function App() {
	const [theme, handleChange, componentMounted, night] = useDarkMode();
	const themeMode = theme === 'light' ? light : dark;
	const [logged, setLogged] = useState(false);
	const [user, setUser] = useState({
		name: '',
		spreadsheetId: ''
	});

	const loginFn = async () => {
		if (!logged) {
			const name = await fetch('/api/getUserInfo', { method: 'get' });
			const data = await name.json();
			
			let u = {
				name: data.givenName,
				spreadsheetId: data.spreadsheetId
			};

			if (name.status === 200) {
				setUser(u);
				setLogged(true);
			}
		}
	}

	const logoutFn = async () => {
		const logout = await fetch('/api/auth/google/logout', { method: 'delete', headers: { 'Content-Type': 'application/json' } });
		if (logout.status === 200) {
			setLogged(false);
			setUser({});
		}
	}

	if (!componentMounted) {
		return <div />
	};

	const Home = () => {
		const location = useLocation();
		if (!logged) {
			if (location.pathname.indexOf('oauth2callback') > 0) {
				loginFn();
			}
		}		

		return (
			<Box display="flex" justifyContent="flex-end" flexDirection="column" height="50vh">
				<Typography align="center" style={{ fontSize: "2em", wordBreak: "break-word" }}>RandomGrapple</Typography>
				{logged &&
					<Typography align="center" variant="h5">Welcome {user.name}</Typography>
				}
				<Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
					<Box p={1}>
						<Button onClick={startClick} size="large" variant="contained" color={night ? 'secondary' : 'primary'} startIcon={<PlayArrowIcon />}>Start</Button>
					</Box>
					<Box p={1}>
						{logged ?
							<Box>
								<GLogin night={night} />
								<Button size="large" variant="contained" color={night ? 'secondary' : 'primary'} onClick={logoutFn} startIcon={<ExitToAppIcon />}>Logout</Button>
							</Box>
							:
							<GLogin night={night} />
							// <Button variant="contained" color={night ? 'secondary' : 'primary'} onClick={loginFn} startIcon={<AccountCircleIcon />}>Login</Button>
						}
					</Box>
				</Box>
			</Box>
		);
	}

	return (
		<ThemeProvider theme={themeMode}>
			<Box display='flex' flexDirection='column' height='90vh' alignItems='center'>
				<GlobalStyles />
				<Router>
					<Home path='/' />
					<Start path='start' night={night} user={user} logged={logged} logout={logoutFn} />
					<Sparring path='sparring' night={night} user={user} logged={logged} logout={logoutFn} />
					<Tournament path='tournament' night={night} user={user} logged={logged} logout={logoutFn} />
					<Timer path='timer' night={night} user={user} logged={logged} logout={logoutFn} />
					<Home path='/oauth2callback' />
				</Router>
				<Box display='flex' flexDirection='row' justifyContent='center'>
					<Switch
						checked={night}
						onChange={handleChange}
						name='night'
					/>
					<Brightness4Icon fontSize='large' />
				</Box>
			</Box>

		</ThemeProvider>
	);
}

export default App;
