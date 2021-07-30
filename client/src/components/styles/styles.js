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
	inputAdd: {
		height: 56,
		color: ({ night }) => night ? 'white' : 'black',
	},
	label: {
		marginTop: '7px'
	},
	paperHandicap: {
		textAlign: 'left',
		padding: theme.spacing(1),
		color: ({ night }) => night ? 'white' : 'black',
		backgroundColor: ({ night }) => night ? '#4B4845' : '#D2D2D2',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: ({ night }) => night ? 'white' : 'black',
		backgroundColor: ({ night }) => night ? '#4B4845' : '#D2D2D2',
	},
	root: {
		spacing: 8,
		flexGrow: 1,
	},
	score: {
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column'
		}
	},
	scoreNum: {
		[theme.breakpoints.down('xs')]: {
			order: -1
		}
	},
	teamBox: {
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
	teamBoxSpace: {
		[theme.breakpoints.down('xs')]: {
			paddingTop: '15px'
		},	
	},
	teamLost: {
		textDecoration: 'line-through'
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
