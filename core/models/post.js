// 文章的模型
import mongoose from './mongoose'

let Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

let postSchema = new Schema({
    // 文章的标题
    title: {
        type: String,
        unique: true
    },
    // 文章唯一的标识，也是作为url显示
    slug: {
        type: String,
        unique: true
    },
    // 文章内容
    content: {
        type: String
    },
    cover: {
        type: String,
        default: null
    },
    // 文章作者
    author: {
        type: ObjectId,
        ref: 'user'
    },
    // 文章标签
    tag: [{
        type: ObjectId,
        ref: 'tag'
    }],
    // 创建时间
    create_at: {
        type : Date,
        default: Date.now
    },
    // 更新时间
    update_at: {
        type : Date,
        default: Date.now
    },
    // 是否公开
    enabled: {
        type:Boolean,
        default: false
    },
    // 文章是第几个版本
    version: {
        type: Number,
        default: 1
    }
}, {
    toJson: {
        virtuals: true
    }
})

let post = mongoose.model('post', postSchema)

export default post