import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(11),
    marginBottom: theme.spacing(11),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
    borderRadius: 7,
    
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    boxShadow: 1
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  switchsili:{
    margin: theme.spacing(2, 0, 2),
    
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  fileInput: {
    width: '50%',
    margin: '10px 0',
    
  },
  FileBase:{
    backgroundColor:'#00a8ff',
  },
  InputStyle:{
    backgroundColor:'#00a8ff',
  },
}));
