import React from 'react';
import { Button, Box } from '@material-ui/core';
// import { GoogleLogin } from 'react-google-login';

export const GLogin = (props) => {
	// const handleResponse = async gData => {
	// 	try {
	// 		const res = await fetch("/api/v1/auth/google", {
	// 		// const res = await fetch("/api/v1/auth/google", {
	// 			method: "POST",
	// 			// body: JSON.stringify({
	// 			// 	token: gData.tokenId
	// 			// }),
	// 			// mode: 'cors',
	// 			credentials: 'include', // include, *same-origin, omit
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			}
	// 		});

	// 		const data = await res.json();
	// 		console.log(data);
	// 	}
	// 	catch (error) {
	// 		console.log(error);
	// 	}
	// }

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
			<Button href="/api/auth/google">
				Login
			</Button>
			{/* <Button onClick={createSpreadSheet}> */}
			<Button onClick={createSpreadSheet}>
				CREATE
			</Button>
			<Button onClick={readSpreadSheet}>
				READ
			</Button>
		</Box>
		// <GoogleLogin
		// 	clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
		// 	accessType="offline"
		// 	prompt="consent"
		// 	buttonText="Sign in with Google"
		// 	className="ct-button ct-button--secondary"
		// 	onSuccess={handleResponse}
		// 	onFailure={handleResponse}
		// 	cookiePolicy="single_host_origin"
		// />
	);
}