import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: '100%',
		padding: theme.spacing(2),
		textAlign: 'center',
		color: ({ night }) => night ? 'white' : 'black',
		backgroundColor: ({ night }) => night ? '#4B4845' : '#D2D2D2',
	},
}));

export const regStyles = makeStyles((theme) => ({
	root: {
		spacing: 8,
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: ({ night }) => night ? 'white' : 'black',
		backgroundColor: ({ night }) => night ? '#4B4845' : '#D2D2D2',
	},
	timer: {
		fontSize: '6em',
		[theme.breakpoints.up('sm')]: {
			fontSize: '10rem',
		},
		[theme.breakpoints.up('md')]: {
			fontSize: '15rem',
		},
	}
}));
