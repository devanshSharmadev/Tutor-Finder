import { relativeTimeRounding } from 'moment'
import React,{useState} from 'react'
import useStyles from './styles'
import {Link,useHistory,useLocation} from 'react-router-dom'
import { AppBar, Typography, Toolbar, Avatar, Button,Paper } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import memberimg from './member.png'
import Alert from '@mui/material/Alert';
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const BuyPage=()=>{
    const classes=useStyles();
    const history = useHistory();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const [buyloading, setbuyloading] = useState(false);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

async function displayRazorpay() {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
     
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
            setbuyloading(true);
      const response = await axios.post(
        `http://localhost:5000/createOrder`,
        {
          amount: 99,
        }
      );
    
        if (!response.data) {
        // alert('Server error. Are you online?');
            NotificationManager.error("Something went Wrong");
        setbuyloading(false);
        return;
      }
    
      // Getting the order details back
      const { amount, id: order_id, currency } = response.data;
    
      const options = {
        key: "rzp_test_hv6LKzFbQ6yQcc", // Enter the Key ID generated from the Dashboard
        amount,
        currency,
        name: "Tutor Finder.",
        description: `Buy`,
        modal: {
          ondismiss: function () {
             setbuyloading(false);
          },
        },
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId: user.result._id,
            amount
          };
          // dispatch(actions.buyuserRequest(data));
     
          const resp = await axios.post('http://localhost:5000/buy', data);

          if (resp.status == 201) {
                NotificationManager.success("Purchase successFull!");
                resp.data.token=user.token;
                setUser(resp.data);
                localStorage.setItem("profile", JSON.stringify(resp.data));
                history.replace("/")
          } else {
                NotificationManager.error("Couldnt buy user");
          }
          setbuyloading(false);
        },
        prefill: {
          name: "xyz",
          email: "username@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Tutor Finder",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error, "sad");
          NotificationManager.error("Something Went Wrong Try Again!!");
      setbuyloading(false);
    }
  }

    return(
    <>
    <br/>
    <div className={classes.headerr}>
    <AppBar className={classes.appBar} position="static" color="inherit">
        <h1 style={{color:"#2c3e50"}}>BUY MEMBERSHIP <MonetizationOnIcon color="success"/></h1>
      <Toolbar className={classes.toolbar}>
          <Button component={Link} to="/" variant="outlined" color="primary"><HomeIcon/></Button>
      </Toolbar>
    </AppBar>
    </div>
    
    
    
        <center>
    <Card sx={{ maxWidth: 445 }}  >
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={memberimg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <b>Perks of being Member</b>
        </Typography>

        <Alert severity="success" style={{margin:2}}><b>Clients can contact you</b></Alert>
        <Alert severity="success" style={{margin:2}}><b>Your account will be verified</b></Alert>
        <Alert variant="filled" style={{margin:2,width:'90%',marginTop:5}}>
            <b>In just 99 rupees</b>
        </Alert>

      </CardContent>
      <CardActions>
        <Button variant="contained" style={{backgroundColor:'none',cursor: "pointer"}}  onClick={() => {
               
                      displayRazorpay();
                  
                  }}>                  {buyloading ? (
                    <CircularProgress size={30} color="#fff" />
                  ) :
                    user?.result.payment ? (
                    "Bought"
                  ) : (
                    "Buy Plan"
                  )
                  }</Button>
      </CardActions>
    </Card>
    </center>
    <br/>
    <br/>
    </>
    )
}

export default BuyPage