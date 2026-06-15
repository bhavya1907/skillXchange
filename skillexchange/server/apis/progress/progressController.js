const progressModel = require("./progressModel")

const add = (req, res) => {
    var errMsgs = []

    if (!req.body.userId) {
        errMsgs.push("userId is required!!")
    }

    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        let progressObj = new progressModel()
        progressObj.userId = req.body.userId
        progressObj.review = req.body.review || ""
        progressObj.Totalmarks = req.body.Totalmarks || 0
        progressObj.obtainedMarks = req.body.obtainedMarks || 0
        progressObj.status = req.body.status !== undefined ? req.body.status : true

        progressObj.save()
            .then((insertedData) => {
                res.send({
                    status: 201,
                    success: true,
                    message: "Progress added successfully!!",
                    data: insertedData
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
}

const getall = (req, res) => {
    progressModel.find(req.body)
        .populate("userId")
        .then((progressdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Data loaded!!",
                data: progressdata
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

const getsingle = (req, res) => {
    if (!req.body._id) {
        return res.send({
            status: 422,
            success: false,
            message: "_id is required!!"
        })
    }

    progressModel.findOne({ _id: req.body._id })
        .populate("userId")
        .then((progressdata) => {
            if (progressdata == null) {
                res.send({
                    status: 404,
                    success: false,
                    message: "Data not found!!"
                })
            }
            else {
                res.send({
                    status: 200,
                    success: true,
                    message: "Data loaded!!",
                    data: progressdata
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

const update = (req, res) => {
    if (!req.body._id) {
        return res.send({
            status: 422,
            success: false,
            message: "_id is required!!"
        })
    }

    progressModel.findOne({ _id: req.body._id })
        .then((progressdata) => {
            if (progressdata == null) {
                res.send({
                    status: 404,
                    success: false,
                    message: "Data not found!!"
                })
            }
            else {
                if (req.body.userId) {
                    progressdata.userId = req.body.userId
                }
                if (req.body.review !== undefined) {
                    progressdata.review = req.body.review
                }
                if (req.body.Totalmarks !== undefined) {
                    progressdata.Totalmarks = req.body.Totalmarks
                }
                if (req.body.obtainedMarks !== undefined) {
                    progressdata.obtainedMarks = req.body.obtainedMarks
                }
                if (req.body.status !== undefined) {
                    progressdata.status = req.body.status
                }

                progressdata.save()
                    .then((updatedData) => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "Progress updated successfully!!",
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

const deleteone = (req, res) => {
    if (!req.body._id) {
        return res.send({
            status: 422,
            success: false,
            message: "_id is required!!"
        })
    }

    progressModel.findOne({ _id: req.body._id })
        .then((progressdata) => {
            if (progressdata == null) {
                res.send({
                    status: 404,
                    success: false,
                    message: "Data not found!!"
                })
            }
            else {
                progressModel.deleteOne({ _id: req.body._id })
                    .then(() => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "Progress deleted successfully!!"
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

module.exports = {
    add,
    getall,
    getsingle,
    update,
    deleteone
}
