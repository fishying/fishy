<template>
    <div class="comment">
        <div class="comment-item" v-for="comment in data">
            <div class="comment-avatar">
                
            </div>
            <div class="comment-box">
                <div class="content">
                    <p class="comment-info">
                        <span v-text="comment.from.admin.name" v-if="comment.from.admin" class="comment-name"></span>
                        <span v-text="comment.from.user.name" v-if="comment.from.user" class="comment-name"></span>
                        <span class="comment-xz"> · </span>
                        <span class="comment-time">{{ comment.time[1] }} </span>
                    </p>
                    <div class="comment-content">
                        {{comment.content}}
                    </div>
                    <div class="comment-tag">
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
        .comment-avatar {
            box-shadow: 0 0 26px -10px #ccc;
            width: 50px;
            min-width: 50px;
            height: 50px;
            min-height: 50px;
            border-radius: 100%;
            background: #ccc;
        }
        .comment-box {
            box-sizing: border-box;
            padding-left: 12px;
            width: 100%;
            min-height: 80px;
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
                        font-size: 18px;
                        color: #404040; 
                        padding-bottom: 6px;
                    }
                    .comment-time {
                        font-size: 16px;
                        color: #aaa;
                    }
                    .comment-xz {
                        color: #aaa;
                        margin: 0 6px;
                    }
                }
                .comment-content {
                    padding-bottom: 6px;
                    color: #666;
                }
                .comment-tag {
                    span {
                        font-size: 14px;
                        color: #aaa;
                    }
                }
            }
        }
    }
}
</style>
<script>
export default {
    props:{
        data:Array,
    }
}
</script>