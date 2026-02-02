const technologyModel = require("./technologyModel")
const add = (req, res) => {

    var errMsgs = []

    if (!req.body.name) {
        errMsgs.push("name is required!!")
    }
    if (!req.body.description) {
        errMsgs.push("description is required!!")
    }
    if (!req.body.thumbnail) {
        errMsgs.push("thumbnail is required!!")
    }

    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        // remove duplicacy
        technologyModel.findOne({ name: req.body.name })
            .then((techdata) => {

                if (techdata == null) {

                    let techObj = new technologyModel()
                    techObj.name = req.body.name
                    techObj.description = req.body.description
                    techObj.thumbnail = req.body.thumbnail
                    techObj.status = true

                    techObj.save()
                        .then((insertedData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Technology added successfully!!",
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
                        message: "Technology already exists!!"
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

    technologyModel.find(req.body)
        .then((techdata) => {

            if (techdata.length === 0) {
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
                    data: techdata
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
        technologyModel.findOne({ _id: req.body._id })
            .then((techdata) => {

                if (techdata == null) {
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
                        data: techdata
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
        technologyModel.findOne({ _id: req.body._id })
            .then((techdata) => {

                if (techdata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Data not found!!"
                    })
                }
                else {
                    if (req.body.name) {
                        techdata.name = req.body.name
                    }
                    if (req.body.description) {
                        techdata.description = req.body.description
                    }
                    if (req.body.thumbnail) {
                        techdata.thumbnail = req.body.thumbnail
                    }
                    if (req.body.status !== undefined) {
                        techdata.status = req.body.status
                    }

                    techdata.save()
                        .then((updatedData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Technology updated successfully!!",
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
const changestatus = (req, res) => {

    var errMsgs = ""

    if (!req.body._id) {
        errMsgs += "_id is required!! "
    }
    if (req.body.status === undefined) {
        errMsgs += "status is required!!"
    }

    if (errMsgs) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        technologyModel.findOne({ _id: req.body._id })
            .then((techdata) => {

                if (techdata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Data not found!!"
                    })
                }
                else {
                    techdata.status = req.body.status
                    techdata.save()
                        .then((updatedData) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Status changed!!",
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
        technologyModel.findOne({ _id: req.body._id })
            .then((techdata) => {

                if (techdata == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "Data not found!!"
                    })
                }
                else {
                    technologyModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Technology deleted successfully!!"
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
    changestatus,
    deleteone
}
