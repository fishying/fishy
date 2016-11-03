<template>
	<article class="article">
		<h2 class="title">{{ data.title }}</h2>
        <div class="meta">
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
        <div class="md" v-html="data.content">
        </div>
	</article>
</template>
<script>
export default {
    data(){
        return {
            data:{}
        }
    },
    created(){
        this.$http.get(`/api/article/${this.$route.params.id}`)
        .then(response=>{
            return response.json()
        }).then(data=>{
            this.data = data.data
        })
    }
}
</script>
<style lang="less">
@import "../../styles/code.css";
article.article {
    h2.title {
        font-size: 40px;
    }
    .meta {
        margin-bottom: 32px;
        a {
            color: #666;
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
        }
        pre {
            background: #f7f7f7;
            padding: 12px;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 16px;
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
        padding: 0 12px;
        h2.title {
            font-size: 30px;
        }
        .md {
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
</style>