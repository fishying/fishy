<template>
    <article class="index">
        <h2 class="title"><router-link :to="path">test</router-link></h2>
        <div class="meta">
            <span>
                <y-tooltips content="test" trigger="hover" theme="dark">
                    <a href="" slot="html">test </a>
                </y-tooltips>
                  ·  
                <y-tooltips content="2016-4-4" trigger="hover" theme="dark">
                    <a href="" slot="html">1 天前 </a>
                </y-tooltips>
            </span>
        </div>
        <router-link :to="path">
        <div class="imgs">
            <img src="http://imgpoobbs.b0.upaiyun.com/uploadfile/photo/2016/10/201610242320501572284829.jpg!photo.middle.jpg" class="index-img">
            <div class="mask">
                <a href="">阅读全文</a>
            </div>
        </div>
        </router-link>
        <p class="outline">
            在我们日常的设计过程中总会遇到些一时难以解决的问题：这个功能放在这里似乎不太对，可是其他位置更不对；在修复一些体验问题时发现页面结构在长期的迭代后做出这种修改的代价过大；
        </p>
        <p class="read-all"><router-link :to="path">--- 阅读全文 ---</router-link></p>
    </article>
</template>
<script>
export default {
    props:{
        path:String,
        data:Object,
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