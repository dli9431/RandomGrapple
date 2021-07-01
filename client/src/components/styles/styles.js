import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

export { useStyles }