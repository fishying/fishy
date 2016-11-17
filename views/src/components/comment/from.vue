<template>
    <div class="comment-form">
        <div class="comment-form-user" v-if="!$store.state.login.status">
            <div class="comment-input">
                <div 
                    contenteditable="true" 
                    class="text"
                    @input="test" 
                    @focus="textOpen"
                    ref="text"  
                    :class="{open:valueBtn}"
                    id="comment-text"
                >
                </div>
            </div>
            <div class="comment-users" v-if="open">
                <input type="text" placeholder="邮箱" v-model="user.email">
                <input type="text" placeholder="昵称" v-model="user.name">
                <input type="text" placeholder="主页" v-model="user.www">
            </div>
        </div>
        <div class="comment-form-admin" v-else>
            <div class="comment-form-avater">
                <img :src="`http://gravatar.duoshuo.com/avatar/${$store.state.login.userInfo.emailmd5}?s=50`">
            </div>
            <div class="comment-input">
                <div 
                    contenteditable="true" 
                    class="text"
                    @input="test" 
                    @focus="textOpen"
                    ref="text"  
                    :class="{open:valueBtn}"
                    id="comment-text"
                >
                </div>
            </div>
        </div>
        <div class="comment-btn" v-if="open">
            <a @click="addComment">评论</a>
            <a @click="textOut" type="ghost">取消</a>
        </div>
    </div>
</template>
<style lang="less">
div.comment-form{
    margin-bottom: 62px;
    .comment-input {
        width: 100%;
        max-width: 100%;
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
    .comment-form-admin {
        display: flex;
        align-items: center;
        min-height: 55px;
        margin-bottom: 12px;
        .comment-form-avater {
            position: absolute;
            border-radius: 100%;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .comment-input {
            padding-left: 67px;
        }
    }
    .comment-btn {
        a {
            cursor:pointer;
        }
    }
}

</style>
<script>
import {detectOS, In} from "../../uilt"
export default {
    props:{
        reply:String
    },
    data(){
        return {
            comment:"",
            open:false,
            textHeight:38,
            valueBtn:true,
            user:{
                name:"",
                email:"",
                www:"",
            }
        }
    },
    mounted(){
        document.addEventListener('click',this.ifEl)
    },
    methods:{
        addComment(){
            if(this.$store.state.login.status){
                this.$http.post("/api/comment", {
                    article:this.$route.params.id,
                    content:this.$refs.text.innerText,
                    os:detectOS(),
                    reply:this.reply
                }).then(response=>{
                    console.log(response)
                })
            }else{
                this.$http.post("/api/comment", {
                    article:this.$route.params.id,
                    content:this.$refs.text.innerText,
                    os:detectOS(),
                    user:this.user,
                    reply:this.reply
                }).then(response=>{
                    console.log(response)
                })
            }
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
        },
        ifEl:function(e){
            if(!this.open) {
                return
            }
            if(!In(e.target, this.$el)){
                this.open = false
            }
        },
    }
}
</script>