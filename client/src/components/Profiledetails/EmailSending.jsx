import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #2c3e50',
  boxShadow: 24,
  p: 4,
  borderRadius:2
};



export default function EmailSending(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [msg,setMsg] = useState('');
  const [user, setUser] = useState({
    from: "",
    subject: "",
    description: "",
    connectID:props.connect,
  });

  const { from, subject, description} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 
  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/email",user)
   .then(response => setMsg(response.data.respMesg));
  };

  console.log(user)

  return (
    <div>
        <Button style={{backgroundColor:"#00a8ff",color:"white"}} onClick={handleOpen} endIcon={<SendIcon />}>
                            Mail
        </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h4><b>Send E-Mail</b></h4><br/><br/>
            <p style={{color:"green",marginLeft:"57px"}}><b>{msg}</b></p>
            <br/>
            <Grid container spacing={2}>

            <Grid item xs={12}>
            <TextField id="outlined-basic" label="From (your email id)" variant="outlined" name="from" onChange={onInputChange} value={from} fullWidth />
            </Grid>
            

            
            <Grid item xs={12}>
            <TextField id="outlined-basic" label="Subject" variant="outlined" name="subject" onChange={onInputChange} value={subject} fullWidth />
            </Grid>
            

            <Grid item xs={12}>
            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="description"
                fullWidth
                onChange={onInputChange}
                value={description}
                />
                </Grid>

                <Grid item xs={12}>

                <Button style={{backgroundColor:"#00a8ff",color:"white"}} onClick={onSubmit} endIcon={<SendIcon />}>
                            Mail
                </Button>

                </Grid>

            </Grid>
                
        </Box>
      </Modal>
    </div>
  );
}