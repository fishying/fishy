<template>
    <div class="add-article">
        <div class="box img" @click="indeximg">
            <div class="content">
                <p>
                <i class="ion-ios-camera-outline"></i>
                </p>
                <p>添加封面</p>
            </div>
        </div>
        <div class="box title">
            <div class="content">
                <input type="text" placeholder="请输入标题" v-model="title">
            </div>
        </div>
        <div class="box content">
            <div class="content">
                <textarea v-model="content"></textarea>
            </div>
        </div>
        <y-button @click.native="add">提交</y-button>

        <y-dialog 
            v-model="imgBtn"
            title="添加封面"
        >
            <template slot="content">
                <input v-model="input1">
            </template>
            <template slot="footer">
                <y-button type="ghost" @click.native="imgBtn = false">取消</y-button>
                <y-button type="primary" @click.native="close1">确认</y-button>
            </template>
        </y-dialog>
    </div>
</template>
<style lang="less">
.add-article {
    .box {
        margin-bottom: 22px;
        &.img {
            cursor: pointer;
            p {
                i {
                    font-size: 42px;
                }
                text-align: center;
                font-size: 28px;
                color: #ccc;
            }
        }
        &.title {
            input {
                width: 100%;
                font-size: 32px;
                outline: none;
                border: none;
                resize:none;
                height: 1.3em;
            }
        }
        &.content {
            textarea {
                width: 100%;
                font-size: 16px;
                outline: none;
                border: none;
                resize:none;
                height: 1.3em;
                min-height: 260px;
            }
        }
    }
}
</style>
<script>
export default {
    data(){
        return {
            title:"",
            content:"",
            imgBtn:false,
        }
    },
    methods:{
        add(){
            this.$http.post("/api/article",{
                title:this.title,
                content:this.content,
                tags:[""]
            }).then((response,err) => {
                console.log(response)
                console.log(err)
            })
        },
        indeximg(){
            this.imgBtn = true
        }
    }
}
</script>