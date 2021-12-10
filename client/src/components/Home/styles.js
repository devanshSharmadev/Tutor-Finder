import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  paginationB: {
    borderRadius: 4,
    marginBottom: '1rem',
    padding: '16px',
  },
  Sitcher:{
    width:"100%",
    paddingLeft:"1%",
    backgroundColor:"#fff200",
    color:"#2C3A47",
    fontFamily:"cursive",
  },
  Sitcher1:{
    width:"100%",
    
  },
  Sitcher2:{
    width:"20%",
    paddingLeft:"1%",
    
    backgroundColor:"#fff200",
    color:"#2C3A47",
    
    fontFamily:"cursive",
    '@media (max-width: 768px)': {
      width:"50%"
    },

  },
  Sitcher3:{
    width:"20%",
    
    paddingLeft:"1%",
    '@media (max-width: 768px)': {
      width:"50%"
    },
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  
}));
