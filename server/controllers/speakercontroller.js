const Speaker=require("../models/speakermodel")
const bcrypt=require("bcrypt")
const mongoose = require('mongoose');


module.exports.speakersignup=async (req,res,next)=>{
    try{
        const {name,email,password,photo,speakerdescription}=req.body
    const emailcheck=await Speaker.findOne({email})
    if(emailcheck)
    return res.json({msg:"Entered Email is already registered",status:false})
    const hashedpassword=await bcrypt.hash(password,10)
    const user=await Speaker.create({
        email,
        name,
        password:hashedpassword,
        photo,
        speakerdescription
    })
    delete user.password
    return res.json({status:true,user})
    }
    catch(ex){
    next(ex)
    }
}



module.exports.speakerlogin=async (req,res,next)=>{
    try{
        const {email,password}=req.body
    const mail=await Speaker.findOne({email})
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



module.exports.getallspeakers = async (req, res, next) => {
  try {
    const speakers = await Speaker.find()
    return res.json(speakers);
  } catch (ex) {
    next(ex);
  }
};
