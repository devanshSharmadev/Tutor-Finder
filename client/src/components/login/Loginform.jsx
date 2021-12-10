import React,{useState} from "react"
import '../../App.css'
import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core'
import useStyles from './Style'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NotificationContainer } from 'react-notifications';
import Signinform from "./Signin"
import Signupform from "./Signup"

const Loginform = () =>{

  const [showPassword,setShowPassword]=useState(false)
  const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)

  const classes=useStyles()
  
  const [isSignup,setIsSignup]=useState(false)
  

  

  const switchMode=()=>{
    setIsSignup((prevIsSignup)=>!prevIsSignup)
    setShowPassword(false)
}

  return(
    <>
    <NotificationContainer />
    <br/>
    <br/>
    <div className="form">
    <Container component="main" maxWidth={isSignup?'md':'xs'} >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon/>
        </Avatar>
        <Typography variant="h5"><b>{isSignup?'Sign Up':'Sign In'}</b></Typography>

        <Grid item xs={12}>
          {isSignup?<><Signupform/></>:
          <Signinform/>
          }
        </Grid>


        <Grid item xs={12}>
            <Grid container justify='flex-end'>
                        <Grid item>
                              <Button onClick={switchMode} style={{fontWeight:"bolder",color:"white", backgroundColor:"#1abc9c", boxShadow:"box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;" }} fullWidth className={classes.switchsili}>
                                <span ><b>{isSignup ? 'Already have an account? Sign In':'If not have account, Sign Up' }</b></span>
                            </Button>
                        </Grid>
            </Grid>

        </Grid>
      </Paper>
    </Container>
    </div>
    </>
  )
}

export default Loginform