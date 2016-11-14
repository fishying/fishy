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
                <y-select v-model="type" clearable>
                    <y-option :value="type._id" :label="type.name" v-for="type in types">{{type.name}}</y-option>
                </y-select>
            </div>
        </div>
        <div class="tags">
            <div class="content">
                <div class="tags" v-if="data !=={}">
                    <y-tag type="gray" closable>1</y-tag>
                </div>
                <input type="text" placeholder="请输入标签，用逗号隔开" v-model="tag">
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
            data:{},
            type:"",
            title:"",
            content:"",
            coverBtn:false,
            coverUrl:"",
            coverUrlBtn:false,
        }
    },
    created(){
        this.$store.dispatch("getType")
        this.$http.get(`/api/article/${this.$route.params.id}?md=no`)
        .then(response=>{
            return response.json()
        })
        .then(article=>{
            this.type = article.data.type._id
            this.data = article.data
        })
    },
    methods:{
        add(){
            this.data.tags = this.data.tags.split(",")
            this.$http.post("/api/admin/update",{
                data:this.data,
                id:this.$route.params.id
            })
            .then((response,err) => {
                console.log(response)
                console.log(err)
            })
        },
        coverDiaOn(){
            this.coverBtn = true
        },
        coverDiaOk(){
            if(this.$refs.coverUrl.value == "") {
                this.$notify.danger("不能为空")
            }else {
                this.data.cover = this.$refs.coverUrl.value
                this.coverBtn = false
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
