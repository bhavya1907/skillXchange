const requestsModel = require("./requestsModel")
const add = (req,res) =>{
    var errMsgs = []
    if(!req.body.title){
        errMsgs.push("title is required!!")
    }
   if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }
    else {
        let requestObj = new requestsModel({
            title: req.body.title,
            // The authenticated identity is the source of truth.  A session can
            // be attached later by an admin when this is a custom mentorship ask.
            sessionId: req.body.sessionId || undefined,
            userId: req.decoded._id,
            message: req.body.message || "",
            paymentType: req.body.paymentType || "online",
            paymentStatus: "unpaid",
            status: true
        });
        requestObj.save()
            .then((result) => {
                res.send({
                    status: 201,
                    success: true,
                    message: "Request sent successfully!!",
                    data: result
                });
            })
            .catch(() => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Error creating request!!"
                });
            });
        }
}
const getall = (req, res) => {
    requestsModel.find(req.body)
        .populate("userId")
        .populate("sessionId")
        .then((requests) => {
            res.send({
                status: 200,
                success: true,
                data: requests
            });
        })
        .catch(() => {
            res.send({
                status: 500,
                success: false,
                message: "Error fetching requests!!"
            });
        });
};
const update = (req, res) => {
    if (!req.body._id) {
        return res.send({
            status: 422,
            success: false,
            message: "_id is required!!"
        });
    }

    requestsModel.findById(req.body._id)
        .then((request) => {
            if (!request) {
                return res.send({
                    status: 404,
                    success: false,
                    message: "Request not found!!"
                });
            }

            request.status = req.body.status ?? request.status;
            request.paymentStatus = req.body.paymentStatus || request.paymentStatus;
            request.paymentType = req.body.paymentType || request.paymentType;

            request.save()
                .then((updated) => {
                    res.send({
                        status: 200,
                        success: true,
                        message: "Request updated successfully!!",
                        data: updated
                    });
                });
        })
        .catch(() => {
            res.send({
                status: 500,
                success: false,
                message: "Error updating request!!"
            });
        });
};
const deleteone = (req,res)=>{
    var errMsgs = []
    if(!req.body._id){
        errMsgs.push("_id is required")
    }
    if(errMsgs.length>0){
        res.json({
            status:422,
            success:false,
            message:errMsgs
        })
    }
    else{
        requestsModel.findOne({_id:req.body._id})
        .then((requestsdata)=>{
            console.log("requests data",requestsdata);
            if(requestsdata == null){
                    res.send({
                        status:404,
                        success:false,
                        message:"data not found!!"
                    })
            }
            else{
                // deletion
                requestsModel.deleteOne({_id:req.body._id})
                .then((requestsdeldata)=>{
                    res.send({
                        status:200,
                        success:true,
                        message:"Data deleted successfully!!"
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

module.exports = {
    add,
    getall,
    update,
    deleteone
};
