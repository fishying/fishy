"use strict";
const article = require("../db/controllers/article");
const user = require("../db/controllers/users");
const type = require("../db/controllers/type");
const comment = require("../db/controllers/comment");
module.exports = (app) => {
    // user 
    app.post("/login", user.login)
    app.post("/logon", user.logon)
    app.post("/checklogin", user.checkLogin)
	// 文章首页
    app.get("/article", article.index)
    app.get("/article/:id", article.article)
    app.post("/article/update", article.edit)
    // app.post("/admin/index", user.requiresLogin, article.num)
    app.post("/article", user.requiresLogin, article.add)
    app.delete("/article/:id", user.requiresLogin, article.del)
    app.post("/admin/update", user.requiresLogin, article.update)
    // type
    // 添加type
    app.post("/type", user.requiresLogin, type.add)
    // 获取type
    app.get("/type", type.finds)
    // comment
    app.post("/comment", comment.add)
    app.get("/comment", comment.finds)
}
