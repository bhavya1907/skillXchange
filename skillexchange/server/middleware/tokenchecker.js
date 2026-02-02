const jwt = require("jsonwebtoken")
const key = "123#@19"
module.exports=(req,res,next)=>{
    var token = req.headers["authorization"]
    // console.log("token is ",token);
    
    if(!token){
        res.send({
            status:403,
            success:false,
            message:"Token not found!!"
        })
    }
    else{
        jwt.verify(token,key,function(err,data){
            if(err != null){
                    res.send({
                        status:403,
                        success:false,
                        message:"invalid token!!"
                    })
            }
            else{
                // valid token
                console.log("data in token",data);
                req.decoded = data
                next()
            }
        })
    }
}
 