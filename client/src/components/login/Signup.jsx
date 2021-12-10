import React,{useState} from "react"
import '../../App.css'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {Avatar,Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core'
import Input from './Input'
import useStyles from './Style'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FileBase from 'react-file-base64';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChipInput from 'material-ui-chip-input';

import Select from '@mui/material/Select';
import {signup} from '../../actions/auth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:'',accounttype:null,ContactNumber:'',ProfileDP:'',state:'',city:'',Pin:[],educationStatus:'',AboutYou:'',Educated:'',TeachesUpto:'',TeachingExperience:'', TutoringTitle:'', TutoringExperience:''}
const initialStateS={email:'',password:''}
const Signupform=()=>{
    const [showEmail,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [RepeatPassword,setRepeatPassword]=useState('')
    const [showType,setType]=useState(null)
    const [FirstName,setFirstName]=useState('')
    const [LastName,setLastName]=useState('')
   

    const [PIN,setPIN]=useState('')
    const [State, setStates] = React.useState('');
    const [City, setCity] = React.useState('');

    const [Educational,setEducation]=useState('')
    const [Experience,setExperience]=useState('')
    const [Teaches,setTeaches]=useState('')

    const [TutTit,setTutTit]=useState('')
    const [tutExp,settutExp]=useState('')

    const [EducationS,setEducationS]=useState('')
    const [Aboutyou,SetAboutyou]=useState('')

    const [ProfilePicture, setProfilePicture]=useState('')

    const classes=useStyles()
    const [showPassword,setShowPassword]=useState(false)
    const [form, setForm] = useState(initialState);
    const dispatch=useDispatch()

    const [page1,setpage1]=useState(false)
    const [page2,setpage2]=useState(false)
    const [page3,setpage3]=useState(false)

    

  const history=useHistory()
    
   
      

      const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)

      const handleNext=()=>{
        
            
          if(page1==false){

            if(form.firstName != '' || form.lastName != '' || form.email != '' || form.password != '' || form.confirmPassword != '' || form.accounttype != null ){
                let x=form.email;  
                let atposition=x.indexOf("@");  
                let dotposition=x.lastIndexOf(".");
                if(atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){
                    
                    NotificationManager.error("Invalid Email Formate");
                }
                else{

                    if(form.password === form.confirmPassword)
                    {
                        if(form.accounttype=="Student"){
                            setpage3(true)
                        }
                        else{
                            setpage3(false)
                        }
                        setpage1(true)
                        
                    }
                    else{
                        NotificationManager.error("Passwords do not match");
                    }
                    
                }
                
            }
            else{
                NotificationManager.error("Kindly fill all credentials");
            }

             
            console.log("We are on page 2") 
          }
          else if(page1==true){

            setpage1(false) 
              
              console.log("We are on page 1") 
          }
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(form, history));
      };

      const handleAddChip = (tag) => {
        setForm({ ...form, Pin: [...form.Pin, tag] });
      };
    
      const handleDeleteChip = (chipToDelete) => {
        setForm({ ...form, Pin: form.Pin.filter((tag) => tag !== chipToDelete) });
      };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return(
        <>
        <NotificationContainer />
            <div style={{backgroundColor:"#00d8d6",paddingTop:10,paddingBottom:14,marginTop:10,borderRadius:5}}>
                <center>
                <h1 style={{color:"#fff"}}>Register at Tutor Finder</h1>
                <p style={{color:"#2c3e50"}}>If you are a tutor or student looking looking for thier rescpective clients then its the best place to find.</p>
                </center>
            </div>

            <form className={classes.form} onSubmit={handleSubmit}>
            
                {page1?
                <>
                   <Grid container spacing={2}>
                        <Grid item xs={8}>
                        <h3><b>Personal Information:</b></h3>
                        </Grid>

                        <Input required name="ContactNumber" label="Contact Number" handleChange={handleChange} type="number"/>

                        
                        <Grid item xs={8}>
                        <h5> Profile Picture * </h5>
                        </Grid>

                        <Grid item xs={8}>
                        <label class="custom-file-upload"><FileBase class="custom-file-upload" style={{backgroundColor:"blue"}} required type="file" multiple={false} onDone={({ base64 }) => {setForm({ ...form, ProfileDP: base64 });setProfilePicture(base64)}} />Upload DP</label>
                        </Grid>
                        <Grid item xs={4}>
                            <Avatar alt="Remy Sharp" src={ProfilePicture} />
                        </Grid>

                        
                        
                        
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">State</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={State}
                                label="State"
                                onChange={(event)=>{setStates(event.target.value);setForm({ ...form, [event.target.name]: event.target.value })}}
                                required
                                fullWidth
                                autoFocus
                                name="state"
                                >
                                
                                <MenuItem value="Andamana and Nicobar Islands"><b>Andamana and Nicobar Islands</b></MenuItem>
                                <MenuItem value="Andhra Pradesh"><b>Andhra Pradesh</b></MenuItem>
                                <MenuItem value="Arunachal Pradesh"><b>Arunachal Pradesh</b></MenuItem>
                                <MenuItem value="Assam"><b>Assam</b></MenuItem>
                                <MenuItem value="Bihar"><b>Bihar</b></MenuItem>

            
                                <MenuItem value="Chhattisgarh"><b>Chhattisgarh</b></MenuItem>
                                <MenuItem value="Chandigarh"><b>Chandigarh</b></MenuItem>
                                <MenuItem value="Dadra and Nagar Haveli"><b>Dadra and Nagar Haveli</b></MenuItem>
                                <MenuItem value="Daman and Diu"><b>Daman and Diu</b></MenuItem>   

                                <MenuItem value="Delhi"><b>Delhi</b></MenuItem>
                                <MenuItem value="Goa"><b>Goa</b></MenuItem>
                                <MenuItem value="Gujarat"><b>Gujarat</b></MenuItem>
                                <MenuItem value="Haryana"><b>Haryana</b></MenuItem>
                                <MenuItem value="Himachal Pradesh"><b>Himachal Pradesh</b></MenuItem>   

                                <MenuItem value="Jammu and Kashmir / Ladakh"><b>Jammu and Kashmir / Ladakh</b></MenuItem>
                                <MenuItem value="Jharkhand"><b>Jharkhand</b></MenuItem>
                                <MenuItem value="karnataka"><b>karnataka</b></MenuItem>
                                <MenuItem value="Kerala"><b>Kerala</b></MenuItem>
                                <MenuItem value="Lakshdweep"><b>Lakshdweep</b></MenuItem>

                                <MenuItem value="Madhya Pradesh"><b>Madhya Pradesh</b></MenuItem>
                                <MenuItem value="Maharashtra"><b>Maharashtra</b></MenuItem>
                                <MenuItem value="Manipur"><b>Manipur</b></MenuItem>
                                <MenuItem value="Meghalaya"><b>Meghalaya</b></MenuItem>
                                <MenuItem value="Mizoram"><b>Mizoram</b></MenuItem>     

                                <MenuItem value="Nagaland"><b>Nagaland</b></MenuItem>
                                <MenuItem value="Odisha"><b>Odisha</b></MenuItem>
                                <MenuItem value="Puducherry"><b>Puducherry</b></MenuItem>
                                <MenuItem value="Punjab"><b>Punjab</b></MenuItem>

                                <MenuItem value="Rajasthan"><b>Rajasthan</b></MenuItem>
                                <MenuItem value="Sikkim"><b>Sikkim</b></MenuItem>
                                <MenuItem value="Tamil Nadu"><b>Tamil Nadu</b></MenuItem>
                                <MenuItem value="Telangana"><b>Telangana</b></MenuItem>
                                <MenuItem value="Tripura"><b>Tripura</b></MenuItem> 

                                <MenuItem value="Uttar Pradesh"><b>Uttar Pradesh</b></MenuItem>
                                <MenuItem value="Uttarakhand"><b>Uttarakhand</b></MenuItem>
                                <MenuItem value="West Bengal"><b>West Bengal</b></MenuItem> 

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                        <Input value={City} name="city" required label="City/District" handleChange={(event)=>{setCity(event.target.value);setForm({ ...form, [event.target.name]: event.target.value })}}/>                            
                        </Grid>

                        <Grid item xs={4}>
                        <ChipInput
                            name="Pin"
                            variant="outlined"
                            label="PIN Codes available"
                            fullWidth
                            value={form.Pin}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                        />
                        </Grid>
                        
                        
                        

                        

                        
                        
                        

                        {page3?
                        <>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Education Status</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={EducationS}
                                name="educationStatus"
                                label="Education Status"
                                onChange={(event)=>{setEducationS(event.target.value);setForm({ ...form, [event.target.name]: event.target.value })}}
                                required
                                >
                                <MenuItem value="Primary School"> <b>Primary School Student</b>  </MenuItem>
                                <MenuItem value="Secondary School"><b>Secondary School Student </b></MenuItem>
                                <MenuItem value="High school student"><b>High School Sudent (9-10)</b></MenuItem>
                                <MenuItem value="Higher Secondary"><b>Higher Secondary Student (11-12)</b></MenuItem>
                                <MenuItem value="Graduting"><b>Graduating Student </b></MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8}>
                        <TextField
                            id="outlined-multiline-flexible"
                            name="AboutYou"
                            label="About You "
                            multiline
                            maxRows={4}
                            fullWidth
                            onChange={handleChange} 
                            variant="outlined"
                            required
                            />
                        </Grid>

                        </>
                        :
                        <>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Education Status</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Educational}
                                label="Education Status"
                                name="Educated"
                                onChange={(event)=>{setEducation(event.target.value);setForm({ ...form, [event.target.name]: event.target.value })}}
                                required
                                >
                                <MenuItem value="High School"><b>High School</b></MenuItem>
                                <MenuItem value="Diploma"><b>Diploma</b></MenuItem>
                                <MenuItem value="Higher Secondary"><b>Higher Secondary</b></MenuItem>
                                <MenuItem value="Graduated"><b>Graduated</b></MenuItem>
                                <MenuItem value="Post Graduated"><b>Post Graduated</b></MenuItem>
                                <MenuItem value="Doctrate"><b>Doctrate</b></MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Teaches For</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Teaches}
                                label="Teaches Upto"
                                name="TeachesUpto"
                                onChange={(event)=>{setTeaches(event.target.value);setForm({ ...form, [event.target.name]: event.target.value })}}
                                required
                                >
                                <MenuItem value="Primary School"><b>Primary School Students </b></MenuItem>
                                <MenuItem value="Secondary School"><b>Secondary School Students</b> </MenuItem>
                                <MenuItem value="High school students"><b>High School Sudents (9-10)</b></MenuItem>
                                <MenuItem value="Higher Secondary"><b>Higher Secondary Students (11-12)</b></MenuItem>
                                <MenuItem value="Graduting"><b>Graduating Students</b></MenuItem>
                                
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Teaching Experience </InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Experience}
                                label="Teahing Experience"
                                name="TeachingExperience"
                                onChange={(event)=>{setExperience(event.target.value);setForm({ ...form, [event.target.name]: event.target.value })}}
                                required
                                >
                                <MenuItem value={0}><b>No experience</b> </MenuItem>
                                <MenuItem value={1}><b>1-2 years </b></MenuItem>
                                <MenuItem value={2}><b>3-5 years</b></MenuItem>
                                <MenuItem value={3}><b>5-10 years </b></MenuItem>
                                <MenuItem value={4}><b>10+ years</b></MenuItem>
                                
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <Input required name="TutoringTitle" label="Tutoring Title" handleChange={handleChange} />
                        </Grid>

                        <Grid item xs={8}>
                        <TextField
                            id="outlined-multiline-flexible"
                            name="TutoringExperience"
                            label="Tutoring Experience in detail"
                            multiline
                            maxRows={4}
                            fullWidth
                            onChange={handleChange} 
                            variant="outlined"
                            required
                            />
                        </Grid>

                        <div style={{backgroundColor:"#00d8d6",paddingTop:10,paddingBottom:14,paddingLeft:10,marginTop:10,borderRadius:5,width:"100%"}}>
                            
                            <ul>
                            <p style={{color:"#2c3e50"}}><b>Tutoring Title:</b> Just give a short title (e.g."Maths Tutor for 9th and 10th") </p>
                            <br/>
                            <p style={{color:"#2c3e50"}}><b>Tutoring Experience in detail:</b> Enter your tutoring experiences, your plus points, your skills and everything in detail.  </p>

                            </ul>
                        </div>

                        </>}

                        <Button style={{float:"left",backgroundColor:"#00a8ff",color:"white"}} variant="contained" className={classes.submit} onClick={()=>handleNext()} startIcon={<ArrowBackIosIcon/>}>
                                   <b>BACK</b>
                        </Button>
                        
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                Sign Up
                        </Button>
                    </Grid> 

                    
                </>
                :
                <>
                    <Grid container spacing={2}>

                        <Grid item xs={8}>
                        <h3>Registeration:</h3>
                        </Grid>
                    
                        <Input name="firstName" value={form.firstName} label="First Name" handleChange={handleChange} autoFocus half/>
                        <Input name="lastName" value={form.lastName} label="Last Name" handleChange={handleChange} half/>
                        <Input name="email" value={form.email} label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" value={form.password} half label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                        <Input name="confirmPassword" value={form.confirmPassword} half label="Repeat Password" handleChange={handleChange} type="password"/>

                        <FormControl component="fieldset">
                            <FormLabel component="legend"><b>Account Type:</b></FormLabel>
                                <RadioGroup row aria-label="gender" value={form.accounttype} name="accounttype" onChange={(event)=>{setType(event.target.value);setForm({ ...form, [event.target.name]: event.target.value })}} required>
                                    <FormControlLabel value="Tutor" control={<Radio />} label="Tutor" />
                                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                </RadioGroup>
                        </FormControl>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                
                                <Button style={{float:"right",backgroundColor:"#00a8ff",color:"white"}} variant="contained" className={classes.submit} onClick={()=>handleNext()} endIcon={<NavigateNextIcon />}>
                                   <b> Next </b>
                                </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                </>
                }
                

            
            </form>
        </>
    )
}

export default Signupform