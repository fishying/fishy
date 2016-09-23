<template>
    <div class="modal-box comments all" v-if="isshow" transition="mdc" @click.self="b">
        <div class="modal-content">
            <div class="m-header">
                <h2>评论</h2>
            </div>
            <div class="m-body">
				<div class="m-comments-all">
                    <div class="comment">
                        <a href="" class="com avatar"><img src="https://avatars2.githubusercontent.com/u/7876498?v=3&s=466"></a>
                        <div class="com content">
                            <header class="username">admin</header>
                            <div class="text">
                                虽然身边好多从不身边的留学朋友，但他们说一盒胃药到要3、4百刀的美国，没有人敢真空生活，心疼美帝的小伙伴
                            </div>
                            <div class="time">
                                2016年9月19日
                            </div>
                            <div class="tag">
                                <span><i class="iconfont icon-like"></i>点赞</span>
                                <span> · </span>
                                <span><i class="iconfont icon-message"></i>评论</span>
                            </div>
                        </div>
                    </div>
				</div>
            </div>
            <div class="m-footer">

                <button class="btn btn-default" @click="b"

                >取消</button>

                <button class="btn btn-primary loading" @click="ok"

                >评论ss</button>
            </div>
        </div>
    </div>
</template>
<style lang="less">
@import "../../assets/style/color";
.loading{
    position: relative;
    text-align: center;
    overflow: hidden;
    &:before{
        content: "\e6a1";
        color: #808080;
        font-size: 18px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -9px;
        margin-top: -12px;
        font-family:"iconfont" !important;
        -webkit-animation:loading .8s infinite linear;
        z-index: 999;
        text-align: center;
    }
    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        opacity: .8;
    }
}
.modal-box.comments.all {
    .modal-content {
        width: 600px;
    }
}
@-webkit-keyframes loading{
    0%{
        -webkit-transform-origin:50% 50%;transform-origin:50% 50%;
        -webkit-transform:rotate(0deg);
        transform:rotate(0deg)
    }to{
        -webkit-transform-origin:50% 50%;
        transform-origin:50% 50%;
        -webkit-transform:rotate(1turn);
        transform:rotate(1turn)
    }
}
.m-comments-all {
    .comment {
        position: relative;
        margin-bottom: 42px;
        .com.avatar {
            position: absolute;
            display: inline-block;
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 100%;
            box-shadow: 0 5px 20px -5px @gray;
            img {
                width: 50px;
                height: 50px;
            }
        }
        .content {
            box-sizing: border-box;
            padding-left: 75px;
            width: 100%;
            header.username {
                font-size: 20px;
                margin-bottom: 6px;
            }
            .text {
                margin-bottom: 10px;
            }
            .time {
                display: inline-block;
                font-size: 14px;
                color: @gray;
                margin-right: 20px;
            }
            .tag {
                display: inline-block;
                font-size: 14px;
                color: @gray;
                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
                span {
                    margin-right: 6px;
                }
            }
        }
        .my-comments-all {
            cursor: pointer;
            position: absolute;
            right: 0;
            bottom: 0;
            i.iconfont {
                margin-right: 4px;
                vertical-align: middle;
            }
        }
    }
}
</style>
<script>
export default {
	props:{
		name:String,
		email:String,
		urls:String,
		content:String,
		isshow:Boolean
	},
    ready(){

    },
    methods:{
        ok(){
            console.log(this)
        },
        b(){
            this.isshow = false
        }
    },
}
</script>