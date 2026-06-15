const skillModel = require("./skillModel")
const add = (req,res)=>{
    var errMsgs = []
    if(!req.body.name){
        errMsgs.push("name is required!!")
    }
    if(!req.body.description){
        errMsgs.push("description is required!!")
    }
    if(errMsgs.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsgs
        })

    }
    else{
        skillModel.findOne({name:req.body.name})
        .then((skilldata)=>{
            console.log("skill data", skilldata);
if (skilldata== null){
                let skillobj = new skillModel()
                skillobj.name = req.body.name
                skillobj.description = req.body.description
                skillobj.save()
                .then((skilldata)=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"skill added successfully",
                        data:skilldata
                    })
                })
                .catch((err)=>{
                    console.log("err is", err);
                    res.send({
                        status:500,
                        success:false,
                        message:"something went wrong!"
                    })
                    
                })

} 
            else{
                res.send({
                    status:422,
                    success:false,
                    message:"Skill already exists!!"
                })
            }
                
        })
        .catch((err)=>{
            console.log("err is", err);
            res.send({
                status:500,
                success:false,
                message:"Something went wrong!!!"
            })
            
        })
        
    }
}
const getall = (req,res)=>{
    skillModel.find()
    .then((skilldata)=>{
        res.send({
                status:200,
                success:true,
                message:"Data loaded!!",
                data:skilldata
        })
    })
    .catch((err)=>{
            res.send({
                status:500,
                success:false,
                messsage:"Something went wrong!!"
            })
    })
}

const getsingle =(req,res)=>{
    if(!req.body._id){
        return res.send({
            status:422,
            success:false,
            message:"_id is required!!"
        })
    }

    skillModel.findOne({_id:req.body._id})
    .then((skilldata)=>{
        if(skilldata == null){
            res.send({
                status:404,
                success:false,
                message:"Skill not found!!"
            })
        }
        else{
            res.send({
                status:200,
                success:true,
                message:"Single record loaded!!",
                data:skilldata
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
const update = (req, res) => {

    var errMsgs = []

    if (!req.body._id) {
        errMsgs.push("_id is required!!")
    }

    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        skillModel.findOne({ _id: req.body._id })
            .then((skilldata) => {

                if (skilldata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Skill not found!!"
                    })
                }
                else {
                    if (req.body.name) {
                        skilldata.name = req.body.name
                    }
                    if (req.body.description) {
                        skilldata.description = req.body.description
                    }
                    if (req.body.status !== undefined) {
                        skilldata.status = req.body.status
                    }

                    skilldata.save()
                        .then((updatedData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Skill updated successfully!!",
                                data: updatedData
                            })
                        })
                        .catch((err) => {
                            res.send({
                                status: 500,
                                success: false,
                                message: "Something went wrong!!"
                            })
                        })
                }

            })
            .catch((err) => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Something went wrong!!"
                })
            })
    }
}
const deleteone = (req, res) => {

    var errMsgs = []

    if (!req.body._id) {
        errMsgs.push("_id is required!!")
    }

    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        skillModel.findOne({ _id: req.body._id })
            .then((skilldata) => {

                if (skilldata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Skill not found!!"
                    })
                }
                else {
                    skillModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Skill deleted successfully!!"
                            })
                        })
                        .catch((err) => {
                            res.send({
                                status: 500,
                                success: false,
                                message: "Something went wrong!!"
                            })
                        })
                }

            })
            .catch((err) => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Something went wrong!!"
                })
            })
    }
}

module.exports = {add,getall,getsingle,update,deleteone}
