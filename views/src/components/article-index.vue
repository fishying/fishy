<template>
    <article class="index">
        <h2 class="title"><router-link :to="path">{{ data.title }}</router-link></h2>
        <div class="meta">
            <span>
                <a>{{data.author.name}} </a>
                  ·  
                <y-tooltips :content="data.time[0]" trigger="hover" theme="dark" placement="bottom">
                    <a href="" slot="html">{{data.time[1]}} </a>
                </y-tooltips>
            </span>
        </div>
        <router-link :to="path" v-if="data.cover">
            <div class="imgs">
                <img :src="data.cover" class="index-img">
                <div class="mask">
                    <router-link :to="path" >阅读全文</router-link>
                </div>
            </div>
        </router-link>
        <p class="outline">
            {{data.content}}
        </p>
        <p class="read-all"><router-link :to="path">--- 阅读全文 ---</router-link></p>
    </article>
</template>
<script>
export default {
    props:{
        path:String,
        data:Object,
    },
    mounted(){
    }
}
</script>
<style lang="less">
article.index {
    width: 100%;
    margin-bottom: 62px;
    h2.title {
        font-size: 26px;
        font-weight: 400;
        color: #404040;
        text-align: center;
        margin: 0;
        a {
            color: #404040;
            text-decoration: none;
        }
    }
    .imgs {
        position: relative;
        width: 106%;
        margin: 12px 0 12px -3%;
        img {
            display: block;
            width: 100%;
        }
        &:hover {
            .mask {
                opacity: 1;
                a {

                    transform: translate3d(0, 0, 0);
                }
            }
        }
        .mask {
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: fade(#fff, 50%);
            display: flex;
            justify-content: center;
            align-items: center;
            a {
                transition: all .3s cubic-bezier(.645,.045,.355,1);
                font-size: 22px;
                color: #686868;
                text-decoration: none;
                transform: translate3d(0, 32px, 0);
                padding: 4px 12px;
            }
        }
    }
    p.outline {
        color: #878787;
        margin-bottom: 12px;
        font-size: 18px;
        line-height: 1.6;
    }
    p.read-all {
        margin-left: 6px;
        font-size: 20px;
        text-align: center;
        margin: 12px 0;
        a {
            text-decoration: none;
            color: #ccc;
        }
    }
    div.meta {
        color: #666;
        margin-bottom: 12px;
        text-align: center;
        margin-top: 6px;
        a {
            color: #999;
            text-decoration: none;
        }
    }
}

@media (max-width: 940px) {
    article.index {
        .imgs{
            width: 100%;
            margin-left: 0;
        }
        p.outline {
            padding: 0 16px;
            font-size: 14px;
        }
    }
}
</style>