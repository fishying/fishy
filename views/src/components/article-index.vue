<template>
    <article class="index">
        <h1 class="title y"><router-link :to="path">{{ data.title }}</router-link></h1>
        <div class="meta">
            <span>
                <a href="" slot="html">{{data.time[1]}} </a>
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
    </article>
</template>
<script>
export default {
    props:{
        path:String,
        data:Object,
    },
}
</script>
<style lang="less">
article.index {
    width: 100%;
    margin-bottom: 62px;
    h1.title {
        margin-bottom: 6px;
        text-align: center;
        a {
            color: #404040;
            text-decoration: none;
        }
    }
    .imgs {
        position: relative;
        width: 106%;
        margin: 12px 0 12px -3%;
        margin-bottom: 24px;
        border-radius: 4px;
        overflow: hidden;
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
        margin-bottom: 24px;
        text-align: center;
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