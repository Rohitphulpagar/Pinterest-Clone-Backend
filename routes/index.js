var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./post");
const passport = require('passport');

//for login purpose
const localStrategy=require("passport-local")
passport.use(new localStrategy(userModel.authenticate()));
/* 
GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//showing two post data with use of id
// router.get("/usePopulate",async(req,res)=>{
// const user=await userModel
// .findOne({_id:"6551b053e8eb584ea6e616bb"})
// .populate('posts')
// res.send(user);
// })
// router.get("/createUser",async(req,res)=>{
//   const createdUser=await userModel.create({
//     username:"Harsh",
//     password:"123",
//     posts:[],
//     email:"harsh@gmail.com",
//     fullName:"Harsh kumar"
//   });
//   res.send(createdUser);
// })

// router.get("/createPost",async(req,res)=>{
// const createdPost=await postModel.create({
//   postText:"hello good morning",
//   user:"6551b053e8eb584ea6e616bb"
// })
// const user=await userModel.findOne({_id:"6551b053e8eb584ea6e616bb"});
// user.posts.push(createdPost._id);
// await user.save();
// res.send("done");
// })

//starting  app here
router.get("/profile",isLoggedIn,(req,res,next)=>{
  res.render("profile");
})
router.get("/login",(req,res,next)=>{
  res.render("login")
})
router.get("/feed",(req,res,next)=>{
  res.render("feed")
})

router.post("/register",async(req,res)=>{
  const{username,email,fullname}=req.body;
  const userData=new userModel({
    username,
    email,
    fullname
  })
    
userModel.register(userData,req.body.password)
.then(()=>{
passport.authenticate("local")(req,res,()=>{
  res.redirect("/profile")
})
  })
}) 


router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login"
}),(req,res)=>{
})

router.get("/logout",(req,res)=>{
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    res.redirect("/");
  })
})
function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
  return next();
res.redirect("login/");
}
module.exports = router;
