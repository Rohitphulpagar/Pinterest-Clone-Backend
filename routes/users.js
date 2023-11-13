var express = require('express');
const mongoose=require("mongoose");
const plm=require("passport-local-mongoose")
mongoose.connect("mongodb+srv://Rk:Rk123@cluster0.ffmsfb5.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("db is connect"))
.catch((err)=>console.log("failed to connect",err));
const userScheme=new mongoose.Schema({
  username:{
   type:String,
   required:true,
   unique:true,
  },
  password:{
    type:String,
    
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post',
    
  }],
  dp:{
    type:String //assuming the profile picture is stores as a URL or file path

  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  fullname:{
    type:String,
    required:true,
  }
})
userScheme.plugin(plm);
const User=mongoose.model("User",userScheme);
module.exports = User;
