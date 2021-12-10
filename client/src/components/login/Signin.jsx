import React,{useState} from "react"
import '../../App.css'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {Avatar,Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core'
import Input from './Input'
import useStyles from './Style'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {signin} from '../../actions/auth'

const initialState={email:'',password:''}
const Signinform=()=>{
    const classes=useStyles()
    const [showPassword,setShowPassword]=useState(false)
    const [form, setForm] = useState(initialState);
    const dispatch=useDispatch()
    const history=useHistory()

    const handleChange=(e)=>{
        setForm({...form, [e.target.name]:e.target.value})
      }

      const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)

      const handleSubmit = (e) => {
        e.preventDefault();

          
          dispatch(signin(form, history));
          
          
      };

    return(
        <>
        
            <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <center>
                <Button type="submit" half variant="contained" color="primary" className={classes.submit}>
                    <b>Sign In</b>
                </Button>
                </center>
                </Grid>
            </Grid>
        </form>
        </>
    )
}

export default Signinform