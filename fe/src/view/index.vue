<template>
    <y-header></y-header>
    <div class="index wrapper">
        <header class="i info">
            <h1 class="title">
                WANAN
            </h1>
            <p class="content">
                你好世界。
            </p>
        </header>
        <article class="i many">
            <article class="top">
                <img src="http://s15.sinaimg.cn/middle/606c7aa9h6b583213800e&690" alt="" class="cover">
                <div class="content">
                    <header class="title">test同时</header>
                    <div class="content">
                        原标题：《从上瘾到治愈：数字成瘾诊断报告》看看各个公司的KPI，我们就知道数字成瘾诊断报告》看看各个公司的KPI，我们就知道...
                    </div>
                    <div class="tag"></div>
                </div>
            </article>
        </article>
    </div>
</template>
<style lang="less">
@import "../assets/style/color";
.index.wrapper {
    .i.info {
        padding-top: 70px;
        padding-bottom: 50px;
        h1.title {
            font-size: 42px;
            text-align: center;
        }
        p.content {
            font-size: 20px;
            text-align: center;
            color: @gray;
        }
    }
    article.i.many {
        article.top {
            position: relative;
            height: 250px;
            overflow: hidden;
            border-radius: 4px;
            img.cover {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                z-index: -1;
            }
            &>div.content {
                height: 250px;
                background: rgba(0,0,0,.3);
            }
        }
    }
}
</style>
<script>
import yHeader from "./r/header"

export default {
    components:{
        yHeader
    }
}
</script>