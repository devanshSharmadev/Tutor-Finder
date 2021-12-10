// Header Files Included
import React,{useState,useEffect} from "react"
import '../App.css'
import {Link,useHistory,useLocation} from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {AppBar,Avatar,Toolbar,Typography,Button,Grid} from '@material-ui/core'
import {useDispatch} from 'react-redux' 
import useStyles from './Style'
import * as actionType from '../constants/actionType';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
 
 const Header = () =>{

  const classes=useStyles()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch=useDispatch()
  const history=useHistory()
  const location=useLocation()

  useEffect(()=>{
    const token=user?.token
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/');

    setUser(null);
  };
 

  return(
    <>
     <NotificationContainer />
    <div className='headd'>
    <center/>
        <div className='heading'>
            <center>
            <h1 className='heading'><span style={{color:"#00a8ff"}}>Tutor</span> Finder </h1>
            </center>
        </div>
        {user ? (
                <div >

                  <div className='loginbtn' >
                    <center>
              


                <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">

                        <Avatar alt="Remy Sharp" src={user?.result.ProfileDP} />

                  </StyledBadge>

                      </center>
                  </div>
                  
                  <div className='signupbtn' >
                    <center>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}><b>Logout</b></Button>
                  </center>
                  </div>
                </div>           
                ):
            (
                <>

                  <center>
                    <div className='loginbtn' >
                    <Grid item xs={8}>
                    <Button fullWidth component={Link} to='/login' variant="outlined" color="primary"><b>Login</b></Button>
                    </Grid>
                    </div>
                    </center>

                  
                </>
            )}
    </div>
    </>
  )
}

export default Header
