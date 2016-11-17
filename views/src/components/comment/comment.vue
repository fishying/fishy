<template>
    <div class="comment">
        <div class="comment-reply" v-if="replyBtn">
            <div class="comment-item">
                <div class="comment-avater">
                    <img :src="`http://gravatar.duoshuo.com/avatar/${reply.from.admin.emailmd5}?s=50`" v-if="reply.from.admin">
                    <img :src="`http://gravatar.duoshuo.com/avatar/${reply.from.user.email}?s=50`" v-else>
                </div>
                <div class="comment-box">
                    <div class="content">
                        <p class="comment-info">
                            <span v-if="reply.from.admin" class="comment-name">{{reply.from.admin.name}}</span>
                            <span v-else class="comment-name">{{reply.from.user.name}}</span>
                            <span class="comment-xz">  </span>
                            <span class="comment-os comment-tag">{{ reply.os }} </span>
                        </p>
                        <div class="comment-content">
                            {{reply.content}}
                        </div>
                        <div class="comment-footer">
                            <span class="comment-time comment-tag">{{ reply.create_time[1] }} </span>
                        </div>
                        <div class="top" @click="replyBtn = false;reply = {}">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <comment-from :reply="reply._id"></comment-from>
        <div class="comment-item" v-for="(comment, index) in data">
            <div class="comment-avater">
                <img :src="`http://gravatar.duoshuo.com/avatar/${comment.from.admin.emailmd5}?s=50`" v-if="comment.from.admin">
                <img :src="`http://gravatar.duoshuo.com/avatar/${comment.from.user.email}?s=50`" v-else>
            </div>
            <div class="comment-box">
                <div class="content">
                    <p class="comment-info">
                        <span v-if="comment.from.admin" class="comment-name">{{comment.from.admin.name}}</span>
                        <span v-else class="comment-name">{{comment.from.user.name}}</span>
                        <span class="comment-xz">  </span>
                        <span class="comment-os comment-tag">{{ comment.os }} </span>
                    </p>
                    <div class="comment-content">
                        {{comment.content}}
                    </div>
                    <div class="comment-footer">
                        <span class="comment-time comment-tag">{{ comment.create_time[1] }} </span>
                        <span class="comment-xz">  </span>
                        <span class="comment-time comment-tag comment-btn" @click="commentBtn(comment._id)">评论</span>
                        <span class="comment-tag more" @click="commentMore(comment._id)" v-if="comment.child">展开评论</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.comment {
    padding-top: 22px;
    .comment-reply {
        .comment-item {
            padding-bottom: 6px;
            .comment-box {
                .content {
                    position: relative;
                    padding: 12px;
                    background: rgba(0,0,0,.04);
                    .top {
                        cursor: pointer;
                        position: absolute;
                        right: 12px;
                        top: 12px;
                    }
                }
            }
        }
    }
    .comment-item {
        display: flex;
        padding-bottom: 22px;
        .comment-avater {
            box-shadow: 0 0 26px -10px #ccc;
            width: 50px;
            min-width: 50px;
            height: 50px;
            min-height: 50px;
            border-radius: 100%;
            background: #ccc;
            overflow: hidden;
        }
        .comment-box {
            box-sizing: border-box;
            padding-left: 12px;
            width: 100%;
            min-height: 80px;
            .comment-tag {
                font-size: 14px;
                color: #aaa;
            }
            .comment-xz {
                color: #aaa;
                margin: 0 6px;
            }
            .content {
                box-sizing: border-box;
                padding: 0 12px 12px 12px;
                border-radius: 8px;
                height: 100%;
                background: #fff;
                .comment-info {
                    margin-bottom: 8px;
                    .comment-name {
                        font-weight: 700;
                        font-size: 16px;
                        color: #404040; 
                        padding-bottom: 6px;
                    }
                }
                .comment-content {
                    padding-bottom: 6px;
                    color: #666;
                }
                .comment-footer {
                    position: relative;
                    .more {
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                    }
                }
            }
            .comment-btn {
                cursor: pointer;
            }
            /*
            .comment-form {
                margin: 0;
                .comment-form-admin {
                    margin: 6px 0;
                    min-height: 32px;
                    .comment-input {
                        padding-left: 38px;
                        .text {
                            font-size: 16px;
                            min-height: 24px;
                            line-height: 24px;
                        }
                    }
                }
                .comment-form-avater {
                    width: 32px;
                    height: 32px;
                }
            }*/
        }
    }
}
</style>
<script>
import {detectOS} from "../../uilt";
import commentFrom from "./from"
export default {
    props:{
        data:Array,
    },
    data(){
        return {
            reply:{},
            replyBtn:false,
            childDialog:false,
            show:false
        }
    },
    components:{
        commentFrom
    },
    methods:{
        commentBtn(id) {
            document.getElementById("comment-text").focus()
            let comments = this.data.filter((comment)=>{
                if(comment._id == id){
                    return comment
                }
            })
            this.reply = comments[0]
            this.replyBtn = true
        },
        commentMore(id) {
            this.childDialog = true
            this.$http.get(`/api/comment/child/${id}`)
            .then(e=>{
                console.log(e)
            })
            console.log(id)
        }
    }
}
</script>