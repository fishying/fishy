"use strict";
var mongoose = require("../db");
var Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

var commentSchema = Schema ({
    /* 谁评论 */
    from : {
        admin:{
            type:ObjectId,
            ref:"user"
        },
        user:{
            type:Object,
        }
    },
    /* 评论谁*/
    reply:{
        type:ObjectId,
        ref:'comment'
    },
    /* 评论的文章 */
    article : {
        required : true,
        type: ObjectId,
        ref:"article"
    },
    /* 内容 */
    content : {
        type : String,
        default : ''
    },
    /* 评论时间 */
    create_time : {
        type : Date,
        default : Date.now
    },
    time:[{
        type:String,
        default: ""
    }],
})

let comment = mongoose.model("comment", commentSchema)

comment.add = (data, callback) => {
    comment.create(data, (err, data) => {
        if(err){

        }else {
            callback(data)
        }
    })
}

comment.finds = (article, callback) => {
    comment.find({article:article})
    .where("reply").exists(false)
    .populate({
        path: "from.admin",
        select: "name _id avatar profile"
    })
    .exec(callback)
}

module.exports = comment