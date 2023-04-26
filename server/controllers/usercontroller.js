const User=require("../models/usermodel")
const bcrypt=require("bcrypt")
const mongoose = require('mongoose');

let db;

mongoose.connection.on('connected', () => {
  db = mongoose.connection.db;
});



module.exports.usersignup=async (req,res,next)=>{
    try{
        const {email,password,firstname,lastname,gender,birthday,phonenumber}=req.body
    const emailcheck=await User.findOne({email})
    if(emailcheck)
    return res.json({msg:"Entered Email is already registered",status:false})
    const hashedpassword=await bcrypt.hash(password,10)
    const user=await User.create({
        email,
        password:hashedpassword,
        firstname,
        lastname,
        gender,
        birthday,
        phonenumber
    })
    delete user.password
    return res.json({status:true,user})
    }
    catch(ex){
    next(ex)
    }
}

module.exports.userlogin=async (req,res,next)=>{
    try{
        const {email,password}=req.body
    const mail=await User.findOne({email})
    if(!mail)
    return res.json({msg:"this email is not registered  note: email  is case sensitive",status:false})

    const ispassswordvalid=await bcrypt.compare(password,mail.password)
    const isPasswordValidWithEmail = await bcrypt.compare(password, mail.password);
    if(!isPasswordValidWithEmail )
    return res.json({msg:"Wrong Password",status:false})
    delete mail.password
    
    return res.json({status:true,mail})
    }
    catch(ex){
    next(ex)
    }
}


/*module.exports.getallusers=async (req,res,next)=>{
    try{
        const users=await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "id",
            "photo",
            "createdAt"
        ])
        return res.json(users)
    }catch(ex){
        next(ex)
    }
}*/

module.exports.deleteuser=async (req,res,next)=>{
    try{
        const users=await User.deleteOne({ username: req.params.username })
        return res.json(users)
    }catch(ex){
        next(ex)
    }
}

/*
module.exports.liveconnections=async (req,res,next)=>{
    try{
        if (!db) {
            return res.status(500).json({ error: 'Database connection not ready' });
          }
      
          db.command({ serverStatus: 1 }, (err, result) => {
            if (err) throw err;
            res.json({ connectionCount: result.connections.current });
          });
    }catch(ex){
        next(ex) 
    }
}
*/