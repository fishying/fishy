<template>
    <div class="add-article container">
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
                    <y-option :value="type._id" :label="type.name" v-for="type in types">{{type.name}}</y-option>
                </y-select>
            </div>
        </div>
        <div class="tags">
            <div class="content">
                <transition-group name="y-tag" class="tag" :class="{ none : tag.length == 0}">
                    <y-tag 
                        type="gray" 
                        closable 
                        v-for="(tags, index) in tag" 
                        :close="deltag.bind(this,index)"
                        :key="tags.key"
                    >{{tags.name}}</y-tag>
                </transition-group>
                <input type="text" placeholder="请输入标签，回车添加" @keyup.enter="addtag">
            </div>
        </div>
        <y-button type="ghost" @click.native="add" v-if="$route.name !== 'upArticle'">提交</y-button>
        <y-button type="ghost"  @click.native="update" v-else>更新</y-button>
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
            tagKey:0,
            tag:[],
            coverBtn:false,
        }
    },
    created(){
        if(this.$route.name == "upArticle"){
            this.$http.get(`/api/article/${this.$route.params.id}?md=no`)
            .then(response=>{
                return response.json()
            })
            .then(article=>{
                this.data = article.data
                // 处理一下原有tag
                this.tag = this.data.tags.map(tag => {
                    this.tagKey++
                    return {key:this.tagKey, name:tag.name}
                })
            })
        }
        // 
        this.$store.dispatch("getType")
    },
    methods:{
        add(){
            this.check()
            .then(()=>{
                
                let tag = this.tag.map((e)=>{
                    return e.name
                })

                this.data.tags = tag

                this.$store.dispatch("addArticle", this.data)
                .then(data=>{
                    this.$router.push("/admin")
                    this.$notify("文章发布成功")
                })
                .catch(err=>{
                    this.$notify.warning("文章发布失败")
                })
            })
        },
        update(){

            let tag = this.tag.map((e)=>{
                return e.name
            })

            this.data.tags = tag

            this.$store.dispatch("upArticle", {
                article: this.data,
                id: this.$route.params.id
            })
            .then(data=>{
                this.$router.push("/admin")
                this.$notify("文章更新成功")
            })
            .catch(err=>{
                this.$notify.warning("文章更新失败")
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
        deltag(i){
            this.tag.splice(i, 1)
        },
        addtag(e){
            if(this.tag.length >= 5) {
                return
            }else {
                this.tagKey++
                this.tag.push({
                    key:this.tagKey,
                    name:e.target.value
                })
                e.target.value = ""
            }
        },
        check(next){
            return new Promise((resolve, reject)=>{
                if(this.data.title == ""){
                    this.$notify("请输入正确的标题")
                    return 
                }else if(this.data.content == ""){
                    this.$notify("请输入正确的内容")
                    return
                }else {
                    resolve()
                }
            })
        }
    },
    computed:{
        types:function(){
            return this.$store.state.index.types
        }
    }
}
</script>
