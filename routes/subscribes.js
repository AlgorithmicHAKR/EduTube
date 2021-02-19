const express=require('express');
const route=express.Router();
const db=require('./database/dbInitialize')
const subscribes=require('./database/subscribes')
route.get('/getAllSubscribes',isAuth,(req,res)=>{
  subscribes.findAll({where:{username:req.query.username}}).then(channels=>{
      return channels;
  }) 
})