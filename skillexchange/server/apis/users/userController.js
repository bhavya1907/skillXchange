const userModel = require("./userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const key = process.env.JWT_SECRET || "development-only-change-me"

const register = (req,res)=>{
        var errMsgs = []
        if(!req.body.name){
                errMsgs.push("name is required!!!")
        }
        if(!req.body.email){
                errMsgs.push("email is required!!!")
        }
        else if(!/^\S+@\S+\.\S+$/.test(req.body.email)){
                errMsgs.push("a valid email is required!!!")
        }
        if(req.body.password && req.body.password.length < 8){
                errMsgs.push("password must be at least 8 characters!!!")
        }
        if(!req.body.password){
                errMsgs.push("password is required!!!")
        }
        
        if(errMsgs.length>0){
                res.send({
                    status:422,
                    success:false,
                    message:errMsgs
                })
        }
        else{
            userModel.findOne({email:req.body.email})
            .then((userdata)=>{
                if(userdata != null){
                    res.send({
                        status:422,
                        success:false,
                        message:"account already exists with this email!!"
                    })
                }
                else{
                    let userObj = new userModel()
                    userObj.name = req.body.name
                    userObj.email = req.body.email
                    userObj.password = bcrypt.hashSync(req.body.password,10)
                    userObj.userType = req.body.userType || 2
                    userObj.address = req.body.address || ""
                    userObj.skills = req.body.skills || undefined
                    userObj.save()
                    .then((insertedData)=>{
                        res.send({
                            status:201,
                            success:true,
                            message:"User registered successfully!!",
                            data:insertedData
                        })
                    })
                    .catch((err)=>{
                        res.send({
                            status:500,
                            success:false,
                            message:"Something went wrong!!"
                        })
                    })
                }
            })
            .catch((err)=>{
                res.send({
                    status:500,
                    success:false,
                    message:"Something went wrong!!"
                })
            })
        }
}

const login = (req,res)=>{
        var errMsgs = []
        if(!req.body.email){
                errMsgs.push("email is required!!!")
        }
        if(!req.body.password){
                errMsgs.push("password is required!!!")
        }
        
        if(errMsgs.length>0){
                res.send({
                    status:422,
                    success:false,
                    message:errMsgs
                })
        }
        else{
            // login logic
            userModel.findOne({email:req.body.email})
            .then((userdata)=>{
                console.log("userdata is",userdata);
                if(userdata == null){
                res.send({
                    status:404,
                    success:false,
                    message:"account not exists with this email!!"
                })

                }
                else{
                    // compare pass
                    bcrypt.compare(req.body.password,userdata.password,function(err,isMatch){
                        if(!isMatch){
                            res.send({
                                status:403,
                                success:false,
                                message:"password wrong!!"
                            })
                        }
                        else{
                            // token login success
                            let payload = {
                                _id:userdata._id,
                                name:userdata.name,
                                email:userdata.email,
                                userType:userdata.userType,
                                address:userdata.address,
                                skills:userdata.skills
                            }
                            let token  = jwt.sign(payload,key)
                          
                            res.send({
                                status:200,
                                success:true,
                                message:"Login successfully!!",
                                token:token,
                                data:userdata
                            })    
                        }
                    })
                    
                }
                
            })
            .catch((err)=>{
                res.send({
                    status:500,
                    success:false,
                    message:"Something went wrong!!"
                })
            })
        }
}

const profile = (req,res)=>{
    userModel.findOne({_id:req.decoded._id}).populate("skills")
    .then((userdata)=>{
        if(userdata == null){
            res.send({
                status:404,
                success:false,
                message:"data not found!!"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"Profile loaded!!",
                data:userdata
            })
        }
    })
    .catch((err)=>{
        res.send({
            status:500,
            success:false,
            message:"Something went wrong!!"
        })
    })
}

const updateProfile = (req,res)=>{
    userModel.findOne({_id:req.decoded._id})
    .then((userdata)=>{
        if(userdata == null){
            res.send({
                status:404,
                success:false,
                message:"data not found!!"
            })
        }
        else{
            if(req.body.name){
                userdata.name = req.body.name
            }
            if(req.body.address){
                userdata.address = req.body.address
            }
            if(req.body.skills){
                userdata.skills = req.body.skills
            }
            userdata.save()
            .then((updatedData)=>{
                res.send({
                    status:200,
                    success:true,
                    message:"Profile updated!!",
                    data:updatedData
                })
            })
            .catch((err)=>{
                res.send({
                    status:500,
                    success:false,
                    message:"Something went wrong!!"
                })
            })
        }
    })
    .catch((err)=>{
        res.send({
            status:500,
            success:false,
            message:"Something went wrong!!"
        })
    })
}

const changePassword = (req,res)=>{
          var errMsgs = []
        // if(!req.body._id){
        //         errMsgs.push("_id is required!!!")
        // }
        if(!req.body.oldpassword){
                errMsgs.push("oldpassword is required!!!")
        }
        if(!req.body.newpassword){
                errMsgs.push("newpassword is required!!!")
        }
        if(!req.body.confirmpassword){
                errMsgs.push("confirmpassword is required!!!")
        }
        
        if(errMsgs.length>0){
                res.send({
                    status:422,
                    success:false,
                    message:errMsgs
                })
        }
        else{
            // change password logic
            if(req.body.newpassword == req.body.confirmpassword){
                    // find userdata and compare old password
                    userModel.findOne({_id:req.decoded._id})
                    .then((userdata)=>{
                            if(userdata == null){
                                    res.send({
                                        status:404,
                                        success:false,
                                        message:"data not found!!"
                                    })
                            }
                            else{
                                    // compare password ->current db
                                    bcrypt.compare(req.body.oldpassword,userdata.password,function(err,ismatch){
                                        if(!ismatch){
                                            // wrong pass
                                            res.send({
                                                status:422,
                                                success:false,
                                                message:"old password is wrong!!"
                                            })
                                        }
                                        else{
                                            // change/update
                                            userdata.password =bcrypt.hashSync(req.body.newpassword,10)
                                            userdata.save()
                                            .then((updatatedata)=>{
                                                    res.send({
                                                        status:200,
                                                        success:true,
                                                        message:"password updated!!"
                                                    })
                                            })
                                              .catch((err)=>{
                                                    res.send({
                                                        status:500,
                                                        success:false,
                                                        message:"Something went wrong!!"
                                                    })
                                                })


                                        }
                                    })
                            }
                    })
                    .catch((err)=>{
                    res.send({
                        status:500,
                        success:false,
                        message:"Something went wrong!!"
                    })
                 })
            }
            else{
                res.send({
                    status:422,
                    success:false,
                    message:"newpassword is not match with confirm password!"
                })
            }
        }
}
module.exports = {register,login,changePassword,profile,updateProfile}
