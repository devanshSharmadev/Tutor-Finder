import React,{useState,useEffect} from 'react'
import useStyles from './styles'
import '../../App.css'
import MuiAlert from '@mui/material/Alert';
import {Link,useHistory,useLocation} from 'react-router-dom'

import { Container, Grow, Grid, AppBar, TextField, Button, Paper,Typography,Switch } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/profileCard';
import Pagination from '../Pagination';
import Posts from '../ProfileCards/ProfileCards'
import Homee from '../Homee/Homee';
import BuyPage from '../BuyPage/BuyPage';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChipInput from 'material-ui-chip-input';
function useQuery() {
    return new URLSearchParams(useLocation().search);
 }

const Home=()=>{

    const classes=useStyles()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const location=useLocation()
    const query = useQuery();
    const page = query.get('page') || 1;
    const [currentId, setCurrentId] = useState(0);
    const searchQuery = query.get('searchQuery');
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const history = useHistory();
    const [pins, setPins] = useState([]);

    const searchPost = () => {
        if (search.trim()|| pins) {
          dispatch(getPostsBySearch({ search,pins: pins.join(',')}));
          history.push(`/search?searchQuery=${search || 'none'}&pins=${pins.join(',')}`);
        } else {
          history.push('/');
        }
      };
    
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };
    
    useEffect(()=>{
        const token=user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
      },[location])

      const [state, setState] = React.useState({
        checkedA: false,
        checkedB: true,
        });
    
        
        
        const [flag,setFlag]=React.useState(user?false:true)

        const handleAddChip = (tag) => setPins([...pins, tag]);

        const handleDeleteChip = (chipToDelete) => setPins(pins.filter((tag) => tag !== chipToDelete));
    
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
        <div className={classes.Sitcher}>

          <div className={classes.Sitcher1}>

              <div className={classes.Sitcher2}>
                  <Grid container spacing={2} >
                    <Grid item xs={4} alignItems="center">
                      <h2>Home</h2>
                    </Grid>
                    <Grid item xs={4} alignItems="center">
                      <Switch checked={flag?state.checkedA:state.checkedB} value={flag} onChange={handleChange2}/>
                    </Grid>
                    <Grid item xs={4} alignItems="center">
                    <h2>Tutors</h2>
                    </Grid>
                    
                  </Grid>
                  
              </div>

              

          </div>

        </div>

        {!flag?
        <>

                <Grow in>
                    <Container maxWidth="xl" style={{marginTop:30}}>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>

                            <Grid item xs={12} sm={6} md={9}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>

                            {user?.result.accounttype=='Tutor'?
                            <>
                              <Paper className={classes.paginationB} elevation={6}>
                                {user?.result.payment ?
                                <Button variant="contained" fullWidth disabled>
                                <b>Already Bought</b>
                                </Button>
                                :
                                <>
                                <Button fullWidth component={Link} to='/BuyMembership' variant="contained" color="primary" endIcon={<MonetizationOnIcon />}><b>Buy Membership</b></Button>
                                </>
                                }
                              </Paper>
                            </>
                            :null}
                            


                            <AppBar className={classes.appBarSearch} position="static" color="inherit">

                                
                                <TextField style={{ margin: '10px 0' }} onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Tutor by name/pin/title" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} /> 

                                
                                <ChipInput
                                  style={{ margin: '10px 0' }}
                                  value={pins}
                                  onAdd={(chip) => handleAddChip(chip)}
                                  onDelete={(chip) => handleDeleteChip(chip)}
                                  label="Search from Pin Code"
                                  variant="outlined"
                                />
                                <br/>
                                <Button onClick={searchPost} className={classes.searchButton} variant="outlined" color="primary"><b>Search</b></Button>
                            </AppBar>
                            <br/>
                                <Paper className={classes.pagination} elevation={6}>
                                    <Pagination page={page} />
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>
                    </Grow>

        </>
        :
        <>
        <Homee/>
        </>
        }
        </>
    )
}

export default Home;