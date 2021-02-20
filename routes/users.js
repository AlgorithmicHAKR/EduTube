const express=require('express')
const route=express.Router()
const {users}=require("../database/users")
route.post("/users",(req,res)=>{
    users.findOne({gmailId:req.body.gmailId}).then(found=>{
        if(!found){
            users.create({gmailId:req.body.gmailId,firstName:req.body.firstName,lastName:req.body.lastName})
            .then(user=>{res.send("New user ha? added to db😀")})
        }else res.send("user logged id 😉")
    })
})