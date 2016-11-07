const comment = require("../models/comment")

const users = require("../controllers/users");
const { wrap: async } = require('co');
const thunkify = require('thunkify-wrap');

const moment = require('moment')
moment.locale('zh-cn');



exports.add = async(function *(req, res){
    let data = {}
    data.from = {}
    for(var i in req.body){
        data[i] = req.body[i]
    }

    console.log(data)

    if(req.session.sign){
        data.from.admin = req.session._id
    }

    comment.add(data, (data)=>{
        res.json({
            status:"success",
            data:data
        })
    })
})

exports.finds = async(function *(req, res){
    let data = yield thunkify(comment.finds)(req.query.article)

    for (let comment of data) {
        comment.time = [moment(comment.create_time).format('lll'), moment(comment.create_time).fromNow()]
    }

    return res.json({
        status:"success",
        data:data
    })
})