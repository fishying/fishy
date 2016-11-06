<template>
    <div class="add-article">
        <div class="img"@click="coverDiaOn">
            <img :src="coverUrl" class="coverimg" v-if="coverUrlBtn">
            <div class="content" v-if="!coverUrlBtn">
                <p>
                <i class="ion-ios-camera-outline"></i>
                </p>
                <p>添加封面</p>
            </div>
        </div>
        <div class="title">
            <div class="content">
                <input type="text" placeholder="请输入标题" v-model="title">
            </div>
        </div>
        <div class="content">
            <div class="content">
                <textarea v-model="content" placeholder="请输入文章内容"></textarea>
            </div>
        </div>
        <div class="type">
            <div class="content">
                <p class="title">分类</p>
                <y-radio-group v-model="type">
                    <y-radio-button label="1" checked>disabled</y-radio-button>
                    <y-radio-button label="2" disabled>disabled</y-radio-button>
                    <y-radio-button label="4">disabled</y-radio-button>
                    <y-radio-button label="3" >disabled</y-radio-button>
                </y-radio-group>
            </div>
        </div>
        <y-button @click.native="add">提交</y-button>

        <y-dialog 
            v-model="coverBtn"
            title="添加封面"
        >
            <template slot="content" class="test">
                <textarea v-model="coverUrl"></textarea>
            </template>
            <template slot="footer">
                <y-button type="ghost" @click.native="coverBtn = false">取消</y-button>
                <y-button type="primary" @click.native="coverDiaOk">确认</y-button>
            </template>
        </y-dialog>
        <y-dialog 
            v-model="coverBtn"
            title="添加封面"
        >
            <template slot="content" class="test">
                <textarea v-model="coverUrl"></textarea>
            </template>
            <template slot="footer">
                <y-button type="ghost" @click.native="coverBtn = false">取消</y-button>
                <y-button type="primary" @click.native="coverDiaOk">确认</y-button>
            </template>
        </y-dialog>
    </div>
</template>
<style lang="less">
.add-article {
    width: 800px;
    margin: 0 auto;
    >.img {
        cursor: pointer;
        background: #efefef;
        margin-bottom: 22px;
        .coverimg {
            width: 100%;
        }
        p {
            padding: 12px;
            i {
                font-size: 42px;
            }
            text-align: center;
            font-size: 28px;
            color: #ccc;
        }
    }
    >.type {
        margin-bottom: 22px;
        font-size: 22px;
        .content {
            display: flex;
            align-items: center;
            p.title {
                color: #a9a9a9;
                font-size: 22px;
            }
            .y-radio-group {
                margin-left: 22px;
                display: flex;
                align-items: center;
                .y-radio {
                    margin: 0 4px;
                }
                .y-btn {
                    border: 1px #ccc solid;
                    border-radius: 2px;
                }
            }
        }
    }
    >.title {
        margin-bottom: 22px;
        input {
            width: 100%;
            font-size: 32px;
            outline: none;
            border: none;
            resize:none;
            height: 1.3em;
        }
    }
    >.content {
        textarea {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            font-size: 16px;
            outline: none;
            border: none;
            resize:none;
            height: 1.3em;
            min-height: 260px;
        }
    }
    >.y-dialog-body {
        textarea {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            border: 1px solid #ccc;
            font-size: 22px;
            border-radius: 4px;
            padding: 4px 6px;
            outline: none;
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
            coverBtn:false,
            coverUrl:"",
            coverUrlBtn:false,
            type:""
        }
    },
    methods:{
        add(){
            this.$http.post("/api/article",{
                title:this.title,
                content:this.content,
                cover:this.coverUrl,
                tags:[""]
            }).then((response,err) => {
                console.log(response)
                console.log(err)
            })
        },
        coverDiaOn(){
            this.coverBtn = true
        },
        coverDiaOk(){
            if(this.coverUrl == "") {
                this.$notify.danger("不能为空")
            }else {
                this.coverUrlBtn = true
                this.coverBtn = false
            }
        }
    }
}
</script>