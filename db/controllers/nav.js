"use strict";
const nav = require("../models/nav")
const { wrap: async } = require('co');

exports.navList = async(function *(req, res){
    let data = yield nav.findNavList()
    res.json({
        data:data
    })
})
exports.addFindNav = async(function *(req, res){
    let data = {
        list:req.body.list
    }
    nav.addFindNav(data)
    res.json({
        data:"data"
    })
})