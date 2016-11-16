<template>
    <div class="comment-form">
        <div class="comment-input">
            <div 
                contenteditable="true" 
                class="text"
                @input="test" 
                @focus="textOpen"
                ref="text"  
                :class="{open:valueBtn}"
            >
            </div>
        </div>
        <div class="comment-users" v-if="open">
            <input type="text" placeholder="邮箱">
            <input type="text" placeholder="昵称">
            <input type="text" placeholder="主页">
        </div>
        <div class="comment-btn" v-if="open">
            <a @click.native="addComment">评论</a>
            <a @click.native="textOut" type="ghost">取消</a>
        </div>
    </div>
</template>
<style lang="less">
div.comment-form{
    margin-bottom: 42px;
    .comment-input {
        .text {
            position: relative;
            width: 100%;
            max-width: 100%;
            border: none;
            outline: none;width: 100%;
            font-size: 24px;
            outline: none;
            border: none;
            min-height: 38px;
            max-height: 6em;
            word-wrap: break-word;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-user-modify: read-write-plaintext-only;
            &.open:after{
                content: "点击评论";
                color: #9b9b9b;
                cursor: text;
            }
        }
    }
    .comment-users {
        input {
            display: block;
            width: 100%;
            border: none;
            outline: none;
            font-size: 18px;
            line-height: 1.8;
            color: #9b9b9b;
        }
    }
    .comment-btn {
        .btn-primary {
            background: none;
            border: none;
            color: #47b8e0;
            font-size: 22px;
        }
        .btn-ghost {
            background: none;
            border: none;
            color: #ccc;
            font-size: 22px;
        }
    }
}

</style>
<script>
export default {
    data(){
        return {
            comment:"",
            open:false,
            textHeight:38,
            valueBtn:true,
        }
    },
    methods:{
        addComment(){
            this.$http.post("/api/comment", {
                article:this.$route.params.id,
                content:this.comment,
                os:detectOS()
            }).then(response=>{
                console.log(response)
            })
        },
        test(){
            if(this.$refs.text.innerText){
                this.valueBtn = false
            }else {
                this.valueBtn = true
            }
        },
        textOpen(){
            this.open = true
        },
        textOut(){
            this.$refs.text.innerText = ""
            this.valueBtn = true
            this.open = false
        }
    }
}
</script>