<template>
	<article class="article" v-if="loading">
        <article class="article-content">
            <div class="imgs container" v-if="data.cover">
                <img :src="data.cover" class="index-img">
            </div>
            <h2 class="title container p-12">{{ data.title }}</h2>
            <div class="meta container p-12">
                <span>
                    <y-tooltips :content="data.author.profile" trigger="hover" theme="dark" placement="bottom">
                        <a href="" slot="html">{{ data.author.name }}</a>
                    </y-tooltips>
                      ·  
                    <y-tooltips :content="data.time[0]" trigger="hover" theme="dark" placement="bottom">
                        <a href="" slot="html">{{data.time[1]}} </a>
                    </y-tooltips>
                </span>
            </div>
            <div class="md container p-12" ref="md" v-html="data.content"></div>
            <div class="tag container p-12">
                <span class="tag-list" v-for="tag in data.tags">{{tag.name}}</span>
            </div>
            <div class="posts-end container">
                <span></span>
            </div>
            <div class="comment-box container p-12" id="comment" v-if="comment">
                <comment :data="comments" @get-comment="getComment"></comment>
            </div>
        </article>
	</article>
</template>
<script>
import {detectOS} from "../../../uilt";
import comment from "../../../components/comment/comment"
export default {
    data(){
        return {
            data:{},
            loading:false,
            htmls:{},
            mask:false,
            comments:[], 
            comment:false,
        }
    },
    created(){
        let title = document.title
        this.$store.dispatch("getArticle", this.$route.params.id)
        .then(article=>{
            document.title = `${this.$config.title} - ${article.title}`
            this.loading = true
            this.data = article
            this.getComment()
        })
        .catch(e=>{
            this.$router.push("/404")
        })
    },
    /*updated(){
        let imgs = this.$refs.md.getElementsByTagName('img')
        for(var img of imgs){
            if(img.className != "emoji"){
                this.imgOpen(img)
            }
        }
    },*/
    methods:{
        getComment(){
            this.$store.dispatch("getOneComment", this.$route.params.id)
            .then(comment=>{
                this.comments = comment
                this.comment = true
            })
        },
        /*
        imgOpen(img){
            let self = this
            img.onload = function(){
                img.clicks = false
                self.imgScale(img)
                self.imgX(img)
                img.addEventListener("click", function(e){
                    if(img.clicks){
                        self.imgEnd(img)
                    }else {
                        self.imgOk(img)
                    }
                })
                document.addEventListener("scroll", this.imgEnd)
                window.addEventListener("resize", this.imgEnd)
            }
        },
        imgOk(img){
            let self = this
            let mask = document.createElement("div")
            mask.className = "mask-img"
            mask.id = "mask-img"
            document.body.appendChild(mask)
            mask.style.opacity = ".8"
            this.imgX(img)
            this.imgStyle(img)
            img.className = "opens-mask"
            img.clicks = true
            mask.addEventListener("click", function(){
                self.imgEnd(img)
            })
        },
        imgEnd(img){
            if(img.clicks){
                let mask = document.getElementById("mask-img")
                mask.style.opacity = 0
                img.style.transform = ''
                img.clicks = false
                mask.addEventListener("transitionend", function(){
                    document.body.removeChild(mask)
                    img.className = ""
                })
            }
        },
        imgScale(img){
            let nWidth = img.naturalWidth
            let cWidth = img.clientWidth
            if(document.body.clientHeight <= img.naturalWidth){
                nWidth = document.body.clientHeight
            }
            img.scale = nWidth / cWidth
        },
        imgX(img){
            let offsetTop = document.body.scrollTop
            let imgTop = img.offsetTop
            let imgHeight = img.naturalHeight
            let clientHeight = document.body.clientHeight

            let widowCenter = offsetTop + (clientHeight / 2)
            let imgCenter = imgTop + (img.clientHeight / 2)
            let imgTTT = img.clientHeight - img.naturalHeight
            img.xc = -(imgCenter - widowCenter)
            // console.log(offsetTop)
            // console.log(imgTop)
        },
        imgStyle(img){
            img.style.transform = "scale(" +img.scale+") translate3d(0, "+ img.xc +"px, 0)"
        }
        */
        addComment(){
            this.$http.post("/api/comment", {
                article:this.$route.params.id,
                content:this.comment,
                os:detectOS()
            }).then(response=>{
                console.log(response)
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="less">
@import "../../../styles/code.css";
</style>