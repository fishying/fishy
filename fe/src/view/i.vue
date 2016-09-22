<template>
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
                <div style="background-image: url(http://yu7er.qiniudn.com/1.jpg);" alt="" class="cover"></div>
                <div class="content">
                    <header class="title"><a v-link="{ path: '/article' }">test同时</a></header>
                    <div class="content">
                        原标题：《从上瘾到治愈：数字成瘾诊断报告》看看各个公司的KPI，我们就知道数字成瘾诊断报告》看看各个公司的KPI，我们就知道...
                    </div>
                    <div class="tag">
                        <span>admin</span>
                        <span> · </span>
                        <span>2016年9月19日</span>
                        <div class="right">
                            <span>5 条评论</span>
                            <span> · </span>
                            <span>44 赞</span>
                        </div>
                    </div>
                </div>
            </article>
            <article class="normal">
                <a href="">
                <div style="background-image: url(http://yu7er.qiniudn.com/1.jpg);" alt="" class="cover"></div>
                </a>
                <div class="content">
                    <header class="title"><a href="">test同时</a></header>
                    <div class="content">
                        原标题：《从上瘾到治愈：数字成瘾诊断报告》看看各个公司的KPI，我们就知道数字成瘾诊断报告》看看各个公司的KPI，我们就知道...
                    </div>
                    <div class="tag">
                        <span>admin</span>
                        <span> · </span>
                        <span>2016年9月19日</span>
                        <div class="right">
                            <span>5 条评论</span>
                            <span> · </span>
                            <span>44 赞</span>
                        </div>
                    </div>
                </div>
            </article>
            <article class="normal">
                <a href="">
                <div style="background-image: url(http://yu7er.qiniudn.com/1.jpg);" alt="" class="cover"></div>
                </a>
                <div class="content">
                    <header class="title"><a href="">test同时</a></header>
                    <div class="content">
                        原标题：《从上瘾到治愈：数字成瘾诊断报告》看看各个公司的KPI，我们就知道数字成瘾诊断报告》看看各个公司的KPI，我们就知道...
                    </div>
                    <div class="tag">
                        <popover :placement="'top'" :position="'center'" :trigger="'hover'">
                            <span slot="content">admin</span>
                            <span slot="html">admin</span>
                        </popover>
                        <span> · </span>
                        <span>2016年9月19日</span>
                        <div class="right">
                            <span>5 条评论</span>
                            <span> · </span>
                            <span>44 赞</span>
                        </div>
                    </div>
                </div>
            </article>
        </article>
        <div class="hr"><i class="iconfont icon-ellipsis"></i></div>
    </div>
</template>
<script>
import popover from "../components/popover"

export default {
    components:{
        popover
    }
}
</script>
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
        article {
            a {

                text-decoration: none;
            }
        }
        article.top {
            position: relative;
            height: 250px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 20px;
            .cover {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                z-index: -1;
                background-position: center center;
                background-size: cover;
            }
            &>div.content {
                height: 250px;
                background: rgba(0,0,0,.5);
                color: #fff;
                padding: 20px;
                header.title {
                    font-size: 24px;
                    margin-bottom: 20px;
                    a {
                        color: #fff;
                    }
                }
                div.content {
                    font-size: 16px;
                }
                &>.tag {
                    position: absolute;
                    left: 0;
                    bottom: 26px;
                    width: 100%;
                    padding: 0 20px;
                    span {
                        margin-right: 6px;
                    }
                    div.right{
                        float: right;
                    }
                }
            }
        }
        article.normal {
            position: relative;
            height: 180px;
            margin-bottom: 20px;
            .cover {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 240px;
                height: 180px;
                margin-right: 12px;
                background-position: center center;
                background-size: cover;
                border-radius: 4px;
            }
            &>.content {
                margin-left: 260px;
                height: 180px;
                position: relative;
                header.title {
                    font-size: 22px;
                    margin-bottom: 6px;
                    a {
                        color: #333;
                    }
                }
                &>.tag {
                    position: absolute;
                    width: 100%;
                    left: 0;
                    bottom: 0;
                    span {
                        margin-right: 6px;
                    }
                    div.right{
                        float: right;
                    }
                }
            }
        }
    }
}
</style>