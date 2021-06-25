import React, { useState } from 'react';
import { Switch } from '@material-ui/core';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { light, dark } from './themes/theme';
import { GlobalStyles } from './themes/global';
import { useDarkMode } from './themes/useDarkMode';

function App() {
	// const [data, setData] = useState(null);

	const [theme, toggleTheme, componentMounted] = useDarkMode();
	const themeMode = theme === 'light' ? light : dark;
	const [night, setNight] = useState(false);

	const handleChange = (event) => {
		setNight(event.target.checked);
		toggleTheme();
	};

	// useEffect(() => {
	// 	fetch('/api')
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// })

	if (!componentMounted) {
		return <div />
	};

	return (
		<ThemeProvider theme={themeMode}>
			<GlobalStyles />
			<div className="App">
				<Switch
					checked={night}
					onChange={handleChange}
					name="night"
				/>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					{/* <p>
						{!data ? 'Loading...' : data}
					</p> */}
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
