import { useState, useEffect } from 'react';

export const useDarkMode = () => {
	const [theme, setTheme] = useState('light');
		
	const [componentMounted, setComponentMounted] = useState(false);
	// switch
	const [night, setNight] = useState(false);

	const setMode = mode => {
		window.localStorage.setItem('theme', mode);
		setTheme(mode);
	}

	const handleChange = (event) => {
		setNight(event.target.checked);
		toggleTheme();
	};

	const toggleTheme = () => {
		if (theme === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	}

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme');
		localTheme === 'dark' ? setNight(true) : setNight(false);
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
			setMode('dark') :
			localTheme ?
				setTheme(localTheme) :
				setMode('light');
		setComponentMounted(true);
	}, []);
	
	return [theme, handleChange, componentMounted, night];
}

