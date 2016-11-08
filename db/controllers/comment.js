const comment = require("../models/comment")

const users = require("../controllers/users");
const { wrap: async } = require('co');
const thunkify = require('thunkify-wrap');

const md5 = require("md5");
const moment = require('moment')
moment.locale('zh-cn');



exports.add = async(function *(req, res){
    let data = {}
    data.from = {}
    for(var i in req.body){
        data[i] = req.body[i]
    }

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
    let data = yield comment.finds(req.query.article)
    let comm = data
    for(let comments of comm){
        comments.create_time = [moment(comments.create_time).format('lll'), moment(comments.create_time).fromNow()]
    }
    return res.json({
        status:"success",
        data:comm
    })
})