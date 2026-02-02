const userModel = require("../apis/users/userModel")
const bcrypt = require("bcrypt")
const adminreg = ()=>{
    userModel.findOne({email:"admin@gmail.com"})
    .then((userdata)=>{
            if(userdata == null){
                    // add admin
                    let userObj = new userModel()
                    userObj.name = "admin"
                    userObj.email = "admin@gmail.com"
                    userObj.password = bcrypt.hashSync("1234",10)
                    userObj.userType = 1
                    userObj.save()
                    .then(()=>{
                        console.log("admin added!!");
                        
                    })
                    .catch((err)=>{
                        console.log("err while adding admin",err);
                        
                    })

            }
            else{
                    // admin already exists
                    console.log("admin already added!!");
                    
            }
    })
    .catch((err)=>{
            console.log("err while find",err);
            
    })
}

module.exports = {adminreg}