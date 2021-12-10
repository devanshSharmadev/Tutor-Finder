var express = require('express');
var mongoose = require('mongoose');
var UserModal=require("../models/user.js")
var ConUserModal=require("../models/conuser.js");
const conuser = require('../models/conuser.js');
const router = express.Router();
const Transaction = require("../models/Transaction");
const Razorpay = require("razorpay");
const nodemailer = require('nodemailer');
require("dotenv").config()


const getProfiles = async (req, res) => {
    
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await UserModal.countDocuments({});
        const posts = await UserModal.find({accounttype:"Tutor"}).sort({ Totallikes: -1 }).limit(LIMIT).skip(startIndex);
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

const getProfile = async (req, res) => { 
    const { id } = req.params;
    try {
        const post = await UserModal.findById(id);
        const post2 = await ConUserModal.find({connectId:post.connectId})
        var email2=post2[0].email
        var checklike=false
        var likevalue=0
        for(var i=0;i<post.likes.length;i++){
            if(post.likes[i].id==req.body.user){
                checklike=true
                likevalue=post.likes[i].value
                break
            }
        }
       
        res.status(200).json({'post':post,'checklike':checklike,'likevalue':likevalue,'email':email2});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPostsBySearch = async (req, res) => {
    const { searchQuery,pins } = req.query;

    try {
        const posts = await UserModal.find(

            { 
                $or: [ { name: { $regex: searchQuery, $options: 'i' } }, 
                    { Pin: { $in: pins.split(',') } },
                    { TutoringTitle: { $regex: searchQuery, $options: 'i' } },
                    { city: { $regex: searchQuery, $options: 'i' } } 
                     ],accounttype:"Tutor"
            }

            );
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await UserModal.findById(id);

    post.comments.push(value);

    const updatedPost = await UserModal.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

const likePost = async (req, res) => {
    const id=req.body.id;
    const value=req.body.value;
    const likedid=req.body.likedid;
    const post = await UserModal.findById(likedid);

    if(post.likes.length==0){
        post.likes.push({value:value,id:id})
        post.Totallikes+=value
            post.AverageLikes=(post.Totallikes)/post.likes.length
        const updatedPost=await UserModal.findByIdAndUpdate(likedid,post,{new:true})
        res.json(updatedPost)
    }
    else{
        var checklike=false
        for(var i=0;i<post.likes.length;i++){
            if(post.likes[i].id==id){
                checklike=true
                break
            }
        }
        if(checklike==false){
            post.likes.push({value:value,id:id})
            post.Totallikes+=value
            post.AverageLikes=(post.Totallikes)/post.likes.length
            const updatedPost=await UserModal.findByIdAndUpdate(likedid,post,{new:true})
            res.json(updatedPost)
        }
        else{
            res.json("Post Already liked")
        }
    }
    
};

const buy=async(req,res)=>{
    try {
        const user = await UserModal.findById(req.body.userId);
        user.payment = true;
        var jan312009 = new Date();
        user.lastupdate = new Date();
        /*user.lastdate = jan312009.setMonth(
          jan312009.getMonth() + parseInt(req.body.dur)
        );*/
        // user.num_of_purchases = user.num_of_purchases + 1;
        await user.save();
        const transaction = new Transaction();
        transaction.date = new Date();
        transaction.transaction_id = req.body.orderCreationId;
        transaction.status = "Completed";
        transaction.price = req.body.amount / 100;
        transaction.user = req.body.userId;
        //console.log(transaction);
        await transaction.save();
        return res.status(201).json({ result: user, token: "" });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ error: "Something went wrong", message: error.message });
      }
}
const createOrder =async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZOR_PAY_KEY_ID ,
        key_secret: process.env.RAZOR_PAY_KEY_SECRET,
      });
      const options = {
        amount: Number(req.body.amount) * 100,
        currency: "INR",
        receipt: `receipt_order_`,
        payment_capture: 1,
      };
      const order = await instance.orders.create(options);
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Something went wrong", message: error.message });
    }
  };
  
const email = async (req, res) => {

    const to= await ConUserModal.find({connectId:req.body.connectID})
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Email_User_id,
          pass: process.env.Password
        }
    });

    var mailOptions = {
        from: process.env.Email_User_id,// sender address
        to: to[0].email, // list of receivers
        subject: req.body.subject, // Subject line
        text:req.body.description,
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.from}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.description}</li>
        </ul>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
            console.log(error)
          res.json({status: true, respMesg: 'Unable to send'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });


}



module.exports={getProfile,getProfiles,getPostsBySearch,commentPost,likePost,email,buy,createOrder}