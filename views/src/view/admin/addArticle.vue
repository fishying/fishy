<template>
    <div class="add-article">
        <div class="img" @click="coverDiaOn">
            <img :src="data.cover" class="coverimg" v-if="data.cover != ''">
            <div class="content" v-else>
                <p>
                <i class="ion-ios-camera-outline"></i>
                </p>
                <p>添加封面</p>
            </div>
        </div>
        <div class="title">
            <div class="content">
                <input type="text" placeholder="请输入标题" v-model="data.title">
            </div>
        </div>
        <div class="content">
            <div class="content">
                <textarea v-model="data.content" placeholder="请输入文章内容"></textarea>
            </div>
        </div>
        <div class="type">
            <div class="content">
                <p class="title">分类</p>
                <y-select v-model="data.type" clearable>
                    <y-option :value="type._id" :label="type.name" v-for="type in types">{{type.name}}
                    </y-option>
                </y-select>
            </div>
        </div>
        <div class="tags">
            <div class="content">
                <div class="tag">
                    <y-tag type="gray" v-for="i in tags" closable>{{i}}</y-tag>
                </div>
                <input 
                    type="text" 
                    placeholder="输入标签，回车添加" 
                    v-model="tag"
                    @keyup.enter="addTag"
                >
            </div>
        </div>
        <y-button @click.native="add">提交</y-button>
        <y-dialog
            v-model="coverBtn"
            title="添加封面"
        >
            <template slot="content" class="test">
                <textarea ref="coverUrl"></textarea>
            </template>
            <template slot="footer">
                <y-button type="ghost" @click.native="coverBtn = false">取消</y-button>
                <y-button type="primary" @click.native="coverDiaOk">确认</y-button>
            </template>
        </y-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:{
                title:"",
                content:"",
                cover:"",
                type:"",
                tags:""
            },
            tag:"", // input输入
            tags:[], // tags
            coverBtn:false,
        }
    },
    created(){
        this.$store.dispatch("getType")
    },
    methods:{
        add(){
            this.data.tags = this.data.tags.split(",")
            this.$http.post("/api/article",this.data)
            .then(response => {
                console.log(response)
            })
            .catch(err=>{

            })
        },
        coverDiaOn(){
            this.coverBtn = true
        },
        coverDiaOk(){

            if(this.coverUrl == "") {
                this.$notify.danger("不能为空")
            }else {
                this.data.cover = this.$refs.coverUrl.value
                this.coverBtn = false
            }
        },
        addTag(){
            if(this.tag != ""){
                this.tags.push(this.tag)
                this.tag = ""
            }
        }
    },
    computed:{
        types:function(){
            return this.$store.state.index.types
        }
    }
}
</script>
