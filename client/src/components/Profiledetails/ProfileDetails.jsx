import React, { useEffect,useState } from 'react';
import { Paper, Typography, CircularProgress, Divider,Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { getPost} from '../../actions/profileCard';
import useStyles from './style';
import CommentSection from './CommentSection';
import RoomIcon from '@mui/icons-material/Room';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import EmailSending from './EmailSending';
var axios=require('axios')
var ServerUrl="http://localhost:5000/"

const LikeProfile=async(v,id)=>{
    try{
        var k=ServerUrl+'like'
        var response=await axios.post(k,v,id)
        const result=response.data.RESULT
        return(result)
    }
    catch(e)
    {
        return(null)
    }
}
const Post=()=>{

    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    const [showlike,setshowlikes]=React.useState(false);
    const [value, setValue] = React.useState(0);
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {

        dispatch(getPost(id,user.result._id));

    }, [id]);

    const handlelike=async(event, newValue)=>{
        setValue(newValue);
        console.log(newValue,user.result._id,post.post._id)
        try{
            var k=ServerUrl+'like'
            var sending={value:newValue,id:user.result._id,likedid:post.post._id}
            var response=await axios.post(k,sending)
            const result=response.data.RESULT
            setshowlikes(true)
            setValue(newValue);
            post.checklike(true)
            return(result)
        }catch(e){
            return null
        }

    }

    

    //console.log(post,isLoading)
    if(post==undefined)
    {
        return(
        
        <CircularProgress size="7em" />
      
        )
    }
    else{
        console.log(post.post.connectId)

        return(
            <Paper style={{ marginLeft:10,marginRight:10 ,marginBottom:10,padding: '20px', borderRadius: '15px',backgroundColor:'#f5f6fa', }} elevation={6}>
        <div className={classes.card}>
                    <div className={classes.section}>
                        <div style={{backgroundColor:"#00d8d6",paddingTop:10,paddingBottom:14,paddingLeft:10,borderRadius:5,color:'#006266'}}>
                    <Typography variant="h3" component="h2"><b>{post.post.name}</b></Typography>
                    <Typography variant="h5">
                        <b>{post.post.accounttype}</b>
                    </Typography>
                    <Typography variant="h6">
                       <RoomIcon/><b> {post.post.city}, {post.post.state}</b>
                    </Typography>
                    </div>
                    <Divider style={{ margin: '20px 0' }} />
                    {post.post.accounttype==="Tutor"?
                    <>
                    <Typography variant="h6" style={{color:'#2C3A47',fontFamily:'Lora'}}>
                        <b>{post.post.TutoringTitle}</b>
                    </Typography>
                    <Typography variant="h4" style={{color:'#2C3A47',fontFamily:'Olivia'}}>
                        <b>"{post.post.TutoringExperience}"</b>
                    </Typography>
                    </>
                    
                    :
                    <>
                    <Typography variant="h5" style={{color:'#2C3A47',fontFamily:'Lora'}}>
                        <b>{post.post.educationStatus}</b>
                    </Typography>
                    <p>{post.post.AboutYou} </p>
                    </>
                    }
                    
                    
                    <Divider style={{ margin: '20px 0' }} />

                    {post.post.accounttype==="Tutor"?
                        <>
                        <Typography variant="h6" style={{color:'#2C3A47',fontFamily:'Lora'}}>
                            <b>Educated: </b>{post.post.Educated}
                        </Typography>
                        <Typography variant="h6" style={{color:'#2C3A47',fontFamily:'Lora'}}>
                            <b>Teaches for: </b>{post.post.TeachesUpto}
                        </Typography>
                        <Typography variant="h6" style={{color:'#2C3A47',fontFamily:'Lora'}}>
                            <b>Teaching Experience: </b>{post.post.TeachingExperience}
                        </Typography>
                        </>
                        
                        :
                        <>
                        </>
                    }

                    {/*<form action={`mailto:${post.email}`}>
                        <p></p><br/>
                        <h3>Contact:</h3>

                        <Button style={{backgroundColor:"#00a8ff",color:"white"}} type="submit" variant="contained" endIcon={<SendIcon />}>
                            Mail
                        </Button>

                    </form> */}
                    <p></p><br/>
                    <h3>Contact:</h3>
                    <EmailSending connect={post.post.connectId} />

                    <Divider style={{ margin: '20px 0' }} />
                    <h3>Give a Review (You can only  give once):</h3>
                    {post.checklike ?<>
                        <Alert severity="success">
                        <Rating name="read-only" value={post.likevalue} readOnly></Rating>
                    </Alert>
                    </>:
                    <>
                    
                        {showlike?<><Alert severity="success">
                        <Rating name="read-only" value={value} readOnly></Rating>
                    </Alert></>:<><Alert severity="info">
                        <Rating name="simple-controlled" value={value} onChange={handlelike}/>
                    </Alert></>
                    }
                    
                    
                    </>
                    }
                    

                    <CommentSection post={post.post} />
                    <Divider style={{ margin: '20px 0' }} />

                    </div>
                    <div className={classes.imageSection}>
                    <img className={classes.media} src={post.post.ProfileDP || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                    </div>
                </div>
                </Paper>
        )
    }

    return(<></>)
   
}


export default Post