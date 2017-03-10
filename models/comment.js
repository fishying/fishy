import mongoose from 'mongoose'
import plugins from '../util/plugin'
plugins(mongoose)

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let commentSchema = new Schema({
    /* 谁评论 */
    from: {
        admin: {
            type: ObjectId,
            ref: 'user',
        },
        user: {
            type: Object,
        }
    },
    /* 评论谁*/
    reply: {
        type: ObjectId,
        ref: 'comment'
    },
    /* 评论的文章 */
    article: {
        required: true,
        type: ObjectId,
        ref: 'article',
        unique: true
    },
    /* 内容 */
    content: {
        type: String,
        default: ''
    },
    /* 评论时间 */
    create_at : {
        type : Date,
        default : Date.now
    },
    os:{
        type: String,
    },
    // 0正常，1待审，-1删除
    state:{
        type: Number,
        default: 0
    }
})

let comment = mongoose.model('comment', commentSchema)

export default comment