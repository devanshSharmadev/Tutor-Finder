var express = require('express');

var mongoose = require('mongoose');
var router = express.Router();
var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')
const signin=require('../controllers/user.js').signin;
const signup=require('../controllers/user.js').signup;
const getProfile=require('../controllers/profileview').getProfile
const getProfiles=require('../controllers/profileview').getProfiles
const getPostsBySearch=require('../controllers/profileview').getPostsBySearch
const commentPost=require('../controllers/profileview').commentPost
const likePost=require('../controllers/profileview').likePost
const email=require('../controllers/profileview').email
const buy=require('../controllers/profileview').buy
const createOrder=require('../controllers/profileview').createOrder
// view engine setup
require("dotenv").config()


mongoose.connect(process.env.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true},function(err,result){
  if(err){
    console.log(`Error is: ${err}`)
  }
  else if(result){
    console.log("Connection Successful")
  }
})

/* GET home page. */


router.post("/signin", signin);
router.post("/signup", signup);
router.post('/like',likePost);
router.get('/', getProfiles);
router.get('/search', getPostsBySearch);
router.post('/email',email);
router.post('/buy',buy);
router.post('/createOrder',createOrder);
router.post('/:id', getProfile);
router.post('/:id/commentPost', commentPost);



module.exports = router;
