<template>
	<article class="article" v-if="loading">
        <article class="article-content">
            <div class="imgs container" v-if="data.cover">
                <img :src="data.cover" class="index-img">
            </div>
            <h2 class="title container">{{ data.title }}</h2>
            <div class="meta container">
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
            <div class="md container" ref="md" v-html="data.content"></div>
            <comment :data="comments"></comment>
        </article>
	</article>
</template>
<script>
import {detectOS} from "../../uilt";
import comment from "../../components/comment/comment"
export default {
    data(){
        return {
            data:{},
            loading:false,
            htmls:{},
            mask:false,
            comment:"",
            comments:[]
        }
    },
    created(){
        this.$store.dispatch("getArticle", this.$route.params.id)
        .then(article=>{
            this.loading = true
            this.data = article
        })
        this.$store.dispatch("getOneComment", this.$route.params.id)
        .then(comment=>{
            this.comments = comment
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
@import "../../styles/code.css";
article.article {
    .imgs {
        margin-bottom: 12px;
        img {
            border-radius: 4px;
            overflow: hidden;
            width: 106%;
            margin-left: -3%;
        }
    }
    h2.title {
        margin-bottom: 12px;
        font-size: 40px;
    }
    .meta {
        margin-bottom: 24px;
        a {
            color: fade(#000, 70%);
            text-decoration: none;
        }
    }
    .md {
        font-size: 20px;
        h1,h2,h3,h4,h5,h6 {
            font-weight: 700;
            margin: 0;
            margin-bottom: 8px !important;
        }
        h1 {
            font-size: 34px;
            padding: 0;
            margin: 0;
            margin-top: 18px;
        }
        h2 {
            font-size: 26px;
            margin-top: 18px;
        }
        h3,h4,h5 {
            font-size: 22px;
            margin-top: 18px;
        }
        h6 {
            margin-top: 18px;
            font-size: 20px;
        }
        hr {
            display: block;
            border: none;
            border-bottom: 1px #efefef solid;
        }
        p {
            margin: 16px 0;
            font-size: 18px;
            line-height: 1.6;
        }
        pre {
            background: #f7f7f7;
            padding: 12px;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 16px;
        }
        img {
            display: block;
            transition: 0.3s all;
        }
        img.emoji {
            display: inline-block;
            height: 1.2em;
            vertical-align: sub;
            width: auto;
            margin: 0;
        }
        table{
            font-size: 16px;
            border:1px solid #e9e9e9
        }
        table thead{
            background:#f7f7f7
        }
        table thead tr{
            border-bottom:1px solid #e9e9e9
        }
        table thead tr th{
            padding: 6px 4px;
            border-left:1px solid #e9e9e9
        }
        table tbody tr{
            border-bottom:1px solid #e9e9e9
        }
        table tbody tr td{
            padding:12px 18px;
            border-left:1px solid #e9e9e9
        }
        img {
            width: 106%;
            margin-left: -3%;
            transform-origin: 50% 25%;
            max-width: 100%;
            max-height: 650px;
            &.opens-mask {
                position: relative;
                z-index: 9999;
                cursor: zoom-out;
            }
        }
        blockquote {
            padding: 10px 20px;
            margin: 0 0 20px;
            font-size: 17.5px;
            border-left: 5px solid #eee;
            background: #f7f7f7;
        }
        code {
            background: #efefef;
            padding: 2px 4px;
            border-radius: 2px;
            font-size: 90%;
            color: #47b8e0;
        }
        pre code {
            padding: 0;
            font-size: inherit;
            color: inherit;
            white-space: pre-wrap;
            background-color: transparent;
            border-radius: 0;
        }
    }
    @media (max-width: 940px) {
        .imgs {
            width: 100%;
            margin: 0;
        }
        .meta {
            padding: 0 12px;
        }
        h2.title {
            padding: 0 12px;
            font-size: 30px;
        }
        .md {
            padding: 0 12px;
            font-size: 16px;
            h1 {
                font-size: 26px;
            }
            h2 {
                font-size: 24px;
            }
            h3 {
                font-size: 20px;
            }
            h4, h5{
                font-size: 18px;
            }
            h6{
                font-size: 16px;
            }
            img {
                width: 100%;
                min-width: 0;
            }
        }
    }
}

.mask-img {
    opacity: 0;
    transition: 0.3s all;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 9998;
}
</style>