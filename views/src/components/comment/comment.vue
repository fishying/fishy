<template>
    <div class="comment p-12">
        <comment-from></comment-from>
        <div class="comment-item" v-for="comment in data">
            <div class="comment-avater">
                <img :src="`http://gravatar.duoshuo.com/avatar/${comment.from.admin.emailmd5}?s=50`">
            </div>
            <div class="comment-box">
                <div class="content">
                    <p class="comment-info">
                        <span v-if="comment.from.admin" class="comment-name">{{comment.from.admin.name}}</span>
                        <span v-if="comment.from.user" class="comment-name">{{comment.from.user.name}}</span>
                        <span class="comment-xz">  </span>
                        <span class="comment-os comment-tag">{{ comment.os }} </span>
                    </p>
                    <div class="comment-content">
                        {{comment.content}}
                    </div>
                    <div class="comment-footer">
                        <span class="comment-time comment-tag">{{ comment.create_time[1] }} </span>
                        <span class="comment-xz">  </span>
                        <span class="comment-time comment-tag">评论</span>
                        <comment-from></comment-from>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.comment {
    padding-top: 22px;
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
                }
            }
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
    components:{
        commentFrom
    }
}
</script>