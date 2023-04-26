const {usersignup, userlogin, deleteuser} =require("../controllers/usercontroller")


const router=require("express").Router()

router.post("/usersignup",usersignup)
router.post("/userlogin",userlogin)
/*router.delete('/:username', deleteuser)*/
module.exports=router