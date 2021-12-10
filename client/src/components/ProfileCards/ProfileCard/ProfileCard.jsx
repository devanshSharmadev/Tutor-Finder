import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Divider } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';
import useStyles from './styles';
import Rating from '@mui/material/Rating';
import { useAlert } from 'react-alert'

const ProfileCard = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const alert = useAlert()
  const userId =  user?.result?._id;
  
  const [value, setValue] = React.useState(2);

  const openPost = (e) => {
    if(user){
      if(user.result.accounttype=="Student"){
        history.push(`/${post._id}`);
      }
      else{
        alert.show('Only Student can view tutors profile')
      }

    }
    else{
      alert.show('Please Login to view full profile')
    }
    
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.ProfileDP || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.name} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          
        </div>
        <div className={classes.title}>
        <Typography style={{color:"#2c3e50"}} className={classes.title} gutterBottom variant="h6" component="h6"><b>{post.accounttype}</b></Typography>
        
        <Rating name="half-rating-read" defaultValue={post.AverageLikes} precision={0.5} readOnly />

        <Divider style={{ margin: '5px 0' }} />

          <Typography className={classes.title} gutterBottom variant="subtitle1" component="h2"><b>{post.TutoringTitle}</b></Typography>
          <Typography className={classes.title} gutterBottom variant="subtitle1" component="h2"><b>{post.educationStatus
}</b></Typography>

          <Typography style={{backgroundColor:"#F8EFBA",borderRadius:5, marginBottom:10}} className={classes.title} variant="caption" display="block" gutterBottom>
            <b>📍{post.city}, {post.state}</b>
          </Typography>
        </div>
        
        
      </ButtonBase>
      
    </Card>
  );
};

export default ProfileCard;
