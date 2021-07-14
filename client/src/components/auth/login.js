import React from 'react';
import { Button, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const GLogin = (props) => {
	const createSpreadSheet = async () => {
		try {
			const res = await fetch("/api/create", {
				method: "POST",
				// body: JSON.stringify({
				// 	token: gData.tokenId
				// }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const data = await res.json();
			console.log(data);
		}
		catch (error) {
			console.log(error);
		}
	}

	const readSpreadSheet = async () => {
		try {
			const res = await fetch("/api/getSheet", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});

			const data = await res.json();
			console.log(data);

		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<Box>
			<Button href="/api/auth/google" size="large" variant="contained" color={props.night ? 'secondary' : 'primary'} startIcon={<AccountCircleIcon />}>
				Login
			</Button>
			<Button onClick={createSpreadSheet}>
				CREATE
			</Button>
			<Button onClick={readSpreadSheet}>
				READ
			</Button>
		</Box>
	);
}