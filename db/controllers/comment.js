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
    }else {
        console.log(req.body)
        data.from.user = req.body.user
    }

    if(req.body.reply) {
        data.reply = req.body.reply
    }
    comment.add(data)
    .then((datas)=>{
        res.json({
            status:"success",
            data:datas
        }) 
    })
})

exports.findChilds = async(function *(req, res){
    const id = req.params.id

    let data = yield comment.findChild(id)

    for(let comments of data){
        comments.create_time = [moment(comments.create_time).format('lll'), moment(comments.create_time).fromNow()]
    }
    res.json({
        status:"success",
        data:data
    }) 
})

exports.finds = async(function *(req, res){
    let data = yield comment.finds(req.query.article)
    let comm = data

    for(let comments of comm){
        let i = yield comment.findsChildNum(comments._id)
        comments.create_time = [moment(comments.create_time).format('lll'), moment(comments.create_time).fromNow()]

        if(comments.from.user) {
            comments.from.user.email = md5(comments.from.user.email)
        }

        if(i>0) {
            comments.child = true
        }
    }
    return res.json({
        status:"success",
        data:comm
    })
})