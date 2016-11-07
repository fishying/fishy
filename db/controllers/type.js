"use strict";
let mongoose = require("mongoose");
let type = require("../models/type");
let article = require("./article")
const { wrap: async } = require('co');

// 添加标签
exports.add = async(function *(req, res){
    type.create(req.body, (err, data)=>{
        if(err){
            res.json({
                "status":"fail",
                "msg":"发布失败"
            })
        }else {
            res.json({
                "status":"success",
            })
        }
    });
})
exports.finds = async(function *(req, res){
    if(req.query.type == "length"){
        type.num((data)=>{
            res.json({
                status:"success",
                data:data
            })
        })
    }else {
        type.all((err, data)=>{
            if(err){
                return res.json({
                    "status":"fail",
                    "msg":"发布失败"
                })
            }else {
                return res.json({
                    "status":"success",
                    "data":data
                })
            }
        });
    }
})

// 添加标签文章
exports.addArt = (tag,id,callback) => {
    type.update({"_id":tag},{"$addToSet":{"article":id}},callback)
}
// 删除type里的文章 
exports.delArt = (types, id, callback) => {
    type.update({"_id":types}, {"$pull":{"article":id}}, callback)
}