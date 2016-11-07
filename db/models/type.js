"use strict";
let mongoose = require("../db");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

let typeSchema = new Schema({
	name:{
		type:String,
		unique:true
	},
	profile:String,
	article:[{
		type:ObjectId,
		ref:"atricle"
	}]
})

let type = mongoose.model("type", typeSchema);

type.all = (callback) => {
    let data = type
    .find()
    .exec(callback)
}
type.allArticle = (id, callback) => {
    let data = type
    .findById(id)
    .populate({
        path: "article",
    })
    .exec(callback)
}
type.num = (callback) => {
    type.count((err,data)=>{
        if(err){
            callback(err)
        }else {
            callback(data)
        }
    })
}

module.exports = type;