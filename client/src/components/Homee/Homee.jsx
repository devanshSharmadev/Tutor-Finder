import React,{useState} from "react"
import './style.css'
import Service from './service.png'
import Card from './Card'
import Grid from '@material-ui/core/Grid';
import img1 from './img1.png'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import tut from './tut.png'
import educate from './educate.png'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Divider} from '@material-ui/core/';
import Alert from '@mui/material/Alert';
import {Button} from '@material-ui/core'
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'

  

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`full-width-tabpanel-${index}`}
		aria-labelledby={`full-width-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box p={3}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }
  
  TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
	return {
	  id: `full-width-tab-${index}`,
	  'aria-controls': `full-width-tabpanel-${index}`,
	};
  }
  
  const useStyles = makeStyles((theme) => ({
	root: {
	  backgroundColor: theme.palette.background.paper,
	  width: 1400,
	},
	large: {
		width: theme.spacing(20),
		height: theme.spacing(20),
	  },
  }));

const Homee = () =>{


	const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

	const [state, setState] = React.useState({
		checkedA: false,
		checkedB: true,
	  });

	  const [flag,setFlag]=React.useState(true)

	  const handleChange2 = (event) => {
		  if(flag==false){
			setFlag(true)
		  }
		  else{
			setFlag(false)
		  }
	  };
	  console.log(flag)
  return(
    <>
		<div className='Aboutcontent'>
			<div className="banner">
				<center>
				<h2 className='bannerh2'>Find the right Tutor for you</h2>
				</center>
			</div>

			<div className='article'>


				<div className='artbott'>
                    <h1>Search for online Tutors</h1>
                    <br/>
					<img src={tut} width="200" height="200" />
					<br/>
					<p>
					Finding a perfect tutor is always a difficult task. So we provide the facility of finding tutor online, only for you guys. With a quick glance, see available Tutors Around you and those offering online tutoring. View Tutors’ subjects, qualifications, availability, rates, and easily send them a mail to arrange a session.
					</p>
					<br/>
					<p>
                        So to enter in this world, all you need to do is just register on our website by just clicking on "login" button on top.
					</p>
					<br/>
				</div>
			</div>

			<div className='Ourservices'>
				<div className='lser'>
				<img src={Service} width="550" height="700"  />
				</div>
				<div className='rser'>
					<h2>Our Services</h2>
					<Divider style={{ margin: '20px 0',color:'white' }} />
					<div className='cardss'>
						<br/>
					<Grid container spacing={3}>
						<br/>
						<Grid item xs={6}>
						<Card img={img1} tit='FIND TUTORS ONLINE' txt="We assist you with fundamental and technical analysis report of client's portfolio at certain time intervals." />
						</Grid>
						<Grid item xs={6}>
						<Card img={img2} tit='SEARCH BY LOCATION' txt="We perform with a stock performance at different times with a target price of 6 months, 1 year, 3 years."/>
						</Grid>
						<Grid item xs={6}>
						<Card img={img3} tit="CONTACT TUTORS" txt="We provide you with a service for a specific portfolio, which is specified at all times and in advance to meet your specific needs." />
						</Grid>
						<Grid item xs={6}>
						<Card img={img4} tit="GIVE A REVIEW" txt="Classroom Special Workshop with Cash and Options Adventure." />
						</Grid>
					</Grid>
					</div>

					<div className='cardss2'>
						<br/>
					<Grid container spacing={3}>
						<br/>
						<Grid item xs={12}>
						<Card img={img1} tit='ANALYSIS' txt="We assist you with fundamental and technical analysis report of client's portfolio at certain time intervals." />
						</Grid>
						<Grid item xs={12}>
						<Card img={img2} tit='PERFORMANCES' txt="We perform with a stock performance at different times with a target price of 6 months, 1 year, 3 years."/>
						</Grid>
						<Grid item xs={12}>
						<Card img={img3} tit="PORTFOLIO" txt="We provide you with a service for a specific portfolio, which is specified at all times and in advance to meet your specific needs." />
						</Grid>
						<Grid item xs={12}>
						<Card img={img4} tit="SERVICING" txt="Classroom Special Workshop with Cash and Options Adventure." />
						</Grid>
					</Grid>
					</div>
				</div>
			</div>

			<div className='team'>
			
			<div className="landinglogin">
				<center>
				<h2 className='landingloginh2'>Explore Tutor Finder</h2>
				<br/>
				
				<Alert variant="filled" severity="success" style={{width:'80%'}}>
					{user?
					<>
					<b>Thanks for signing up</b>
					</>
					:
					<>
					<b>By just signing up</b>
					</>
					}
					
				</Alert>
				<br/>
					<div className="logincardlp">
				
					{user?
					<>
					<h1>We hope, you are enjoying the following</h1>
					</>
					:
					<>
					<h1>Join</h1>
					</>
					}

					
					<br/>
					<Alert variant="outlined" severity="success" >
					<b>Search for the right tutor</b>
					</Alert><br/>
					<Alert variant="outlined" severity="success">
					<b>Communicate with Tutor</b>
					</Alert><br/>
					<Alert variant="outlined" severity="success">
					<b>Give a review about tutor</b>
					</Alert><br/>
					<Alert variant="outlined" severity="success">
					<b>Become a online tutor</b>
					</Alert><br/>
					<Grid item xs={8}>
					{user?
					null
					:
					<>
					<Button fullWidth component={Link} to='/login' variant="outlined" color="primary"><b>Login</b></Button>

					</>
					}
                    </Grid>
				</div>

				</center>

			</div>
				
			</div>

			<div className='footer'>
				<br/>
				<h5>© 2021 Tutor Finder - All Rights Reserved</h5>
				<br/>
			</div>

		</div>
    </>
  )
}

export default Homee

