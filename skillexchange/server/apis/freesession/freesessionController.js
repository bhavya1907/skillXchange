const freesessionModel = require("./freesessionModel")
const add = (req, res) => {

    var errMsgs = []

    if (!req.body.title) {
        errMsgs.push("title is required!!")
    }
    if (!req.body.addedBy) {
        errMsgs.push("addedBy is required!!")
    }
    if (!req.body.technologyId) {
        errMsgs.push("technologyId is required!!")
    }
    if (!req.body.description) {
        errMsgs.push("description is required!!")
    }

    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        freesessionModel.findOne({ title: req.body.title })
            .then((sessiondata) => {

                if (sessiondata == null) {

                    let sessionObj = new freesessionModel()
                    sessionObj.title = req.body.title
                    sessionObj.addedBy = req.body.addedBy
                    sessionObj.technologyId = req.body.technologyId
                    sessionObj.description = req.body.description
                    sessionObj.attachment = req.body.attachment
                    sessionObj.playlist = req.body.playlist
                    sessionObj.noofvids = req.body.noofvids || 0

                    sessionObj.save()
                        .then((insertedData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Free session added successfully!!",
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
                else {
                    res.send({
                        status: 422,
                        success: false,
                        message: "Data already exists with same title!!"
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
const getall = (req, res) => {

    freesessionModel.find(req.body)
        .populate("addedBy")
        .populate("technologyId")
        .then((sessiondata) => {

            if (sessiondata.length === 0) {
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
                    data: sessiondata
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
const getsingle = (req, res) => {

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
        freesessionModel.findOne({ _id: req.body._id })
            .populate("addedBy")
            .populate("technologyId")
            .then((sessiondata) => {

                if (sessiondata == null) {
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
                        data: sessiondata
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
        freesessionModel.findOne({ _id: req.body._id })
            .then((sessiondata) => {

                if (sessiondata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Data not found!!"
                    })
                }
                else {
                    if (req.body.title) {
                        sessiondata.title = req.body.title
                    }
                    if (req.body.addedBy) {
                        sessiondata.addedBy = req.body.addedBy
                    }
                    if (req.body.technologyId) {
                        sessiondata.technologyId = req.body.technologyId
                    }
                    if (req.body.description) {
                        sessiondata.description = req.body.description
                    }
                    if (req.body.attachment) {
                        sessiondata.attachment = req.body.attachment
                    }
                    if (req.body.playlist) {
                        sessiondata.playlist = req.body.playlist
                    }
                    if (req.body.noofvids !== undefined) {
                        sessiondata.noofvids = req.body.noofvids
                    }

                    sessiondata.save()
                        .then((updatedData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Data updated successfully!!",
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
        freesessionModel.findOne({ _id: req.body._id })
            .then((sessiondata) => {

                if (sessiondata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Data not found!!"
                    })
                }
                else {
                    freesessionModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Data deleted successfully!!"
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
module.exports = {
    add,
    getall,
    getsingle,
    update,
    deleteone
}
