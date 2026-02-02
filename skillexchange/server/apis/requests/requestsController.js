const requestsModel = require("./requestsModel")
const add = (req,res) =>{
    var errMsgs = []
    if(!req.body.title){
        errMsgs.push("title is required!!")
    }
    if(!req.body.sessionId){
        errMsgs.push("sessionId is required!!")
    }
    if(!req.body.userId){
        errMsgs.push("userId is required!!")
    }
   if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
}