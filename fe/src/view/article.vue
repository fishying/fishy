<template>
    <div class="article-cot wrapper">
        <article>
            <div style="background-image: url(http://yu7er.qiniudn.com/1.jpg);" alt="" class="cover"></div>
            <header class="title">test同时</header>
            <div class="tag">
                <popover :placement="'top'" :position="'center'" :trigger="'hover'">
                    <span slot="content">admin</span>
                    <span slot="html">admin</span>
                </popover>
                <span> · </span>
                <span>2016年9月19日</span>
            </div>
            <div class="content">
                <p>晚上，微博上忽然出现了一条爆料，之前吴小姐在国外现场观看一场比赛时，在国歌奏响时并没有起立，该微博引发了网友的广泛讨论。</p>
                <p>而吴小姐方面很快澄清，她几年前就已经改了国籍，并非中国公民，因此并没有义务这么做。</p>
                <p>两天后，天涯，豆瓣等网站开始陆续出现一些匿名帖，扒出吴小姐曾经在国外参加节目时用英文发表过一些不适当的言论，并且和一些反华的外国明星是好朋友，这让人不得不怀疑她改国籍背后的动机。</p>

                <p>吴小姐方面继续回应，这些事根本就是子虚乌有，她改国籍只是为了出国学习，和那些明星也只是在拍戏的过程中有过接触。</p>

                <p>网络舆论随后持续升温，开始扒出吴小姐这些年在国外拍摄的一些电影都是和一些对我们国家并不友好的明星合作的，他们都在国内市场赚了一大笔钱。</p>

                <p>整个事件的关注度开始逐渐变得越来越大，吴小姐的公关开始失去作用，他们每发一次声明，这个声明本身包含的信息都成为了下一个爆料的论点，随后吴小姐方面不得不保持沉默，但事态已经开始失控了，众多愤怒的网友开始疯狂地攻击与谩骂，将吴小姐塑造成了一个卖国贼的形象，并开始呼吁抵制她的电影，她的微博也随之关闭了评论。</p>

                <p>随后的几个月，吴小姐的公众形象一落千丈，事业也陷入了低谷，生活中还要饱受着许多不知名的骚扰和人身威胁，终于在某天夜里，不堪巨大身心压力的她服下大量的安眠药，在自己家中自尽了。</p>
                <p>所有的一切几乎都在我和大刘的掌控之中，除了这个出人意料的结局。</p>

                <p>在吴小姐自杀消息传出的那天晚上，大刘把我约到了一个烧烤摊，他喝着酒，眼里写满了疲惫与怀疑，他告诉我其实他早已把郭小姐当初给他的那笔钱原封不动全退了回去，因为他知道郭小姐想毁掉吴小姐的理由，仅仅只是因为她在刚出道时被比她出名的吴小姐言语羞辱过一次。</p>

                <p>“所以这就是人与人之间的仇恨吗？”我问大刘道。</p>
                <p>“我曾经不相信这一点，但当我这些年看遍了这么多东西，才知道人与人之间的仇恨究竟能大到怎样的一个地步，这就是为什么互联网舆论的力量能如此强大，因为它本质上靠着就是这种负面的本能在驱动着，富人瞧不起穷人，穷人嫉妒富人，每个人都渴望做英雄，却只能寄望于消灭与自己立场不同阶级不同的人，这或许就是人性本质里的‘恶’，根深蒂固。”</p>
                <p>“因此干我们这行的，也是有罪的吧。”我叹了口气道。</p>
                <p>“我们只是引诱亚当和夏娃吃下禁果的蛇，不过亚当夏娃吃的是善恶果，而我们让他们吃的是罂粟种子。”</p>

                <p>第二天早上，大刘忽然悄无声息地不辞而别了，他临走前把公司交给了我，然后就这样人间蒸发了，除此之外没有留下任何多余的话。</p>
                <p>从那以后，我再也没有见过大刘，他究竟去了哪里，做了什么，也没有任何人知道。后来的我只有在每次上网时，看见铺天盖地的宣传或攻击，情绪激动的网民与言论，以及无数扑朔迷离却来去匆匆的事件时，才会偶尔想起这么一个人，他曾经躲在这所有喧嚣的背后，在仅仅一个屏幕面前，自信而有条不紊地操纵掌控着这一切。</p>

                <p>或许大刘还在，或许无数个像大刘一样的人还在，更或许根本从来就没有过什么大刘，这个世界本身，就是一片无尽的混沌与虚妄。</p>
            </div>
        </article>
        <div class="tag">
            <span>程序</span>
            <span>设计</span>
        </div>
        <div class="hr"><i class="iconfont icon-message"></i></div>
        <div class="from">
            <button class="btn btn-gray" @click="comment">评论</button>
        </div>
        <div class="comments">
            <div class="comment">
                <a href="" class="com avatar"><img src="https://avatars2.githubusercontent.com/u/7876498?v=3&s=466"></a>
                <div class="com content">
                    <header class="username">admin</header>
                    <div class="text">
                        虽然身边好多从不身边的留学朋友，但他们说一盒胃药到要3、4百刀的美国，没有人敢真空生活，心疼美帝的小伙伴
                    </div>
                    <div class="time">
                        2016年9月19日
                    </div>
                    <div class="tag">
                        <span><i class="iconfont icon-like"></i>点赞</span>
                        <span> · </span>
                        <span><i class="iconfont icon-message"></i>评论</span>
                    </div>
                </div>
            </div>
            <div class="comment">
                <a href="" class="com avatar"><img src="https://avatars2.githubusercontent.com/u/7876498?v=3&s=466"></a>
                <div class="com content">
                    <header class="username">admin</header>
                    <div class="text">
                        虽然身边好多从不身边的留学朋友，但他们说一盒胃药到要3、4百刀的美国，没有人敢真空生活，心疼美帝的小伙伴
                    </div>
                    <div class="time">
                        2016年9月19日
                    </div>
                    <div class="tag">
                        <span><i class="iconfont icon-like"></i>点赞</span>
                        <span> · </span>
                        <span><i class="iconfont icon-message"></i>评论</span>
                    </div>
                </div>
                <div class="my-comments-all" @click="comment">
                    <i class="iconfont icon-solution"></i>全部评论
                </div>
            </div>
        </div>
        <comments-all :isshow.sync="c_isshow"></comments-all>
        <!--<comments></comments>-->
    </div>
</template>
<style lang="less">
@import "../assets/style/color";
.article-cot {
    margin-top: 60px;
    article {
        .cover {
            width: 100%;
            height: 420px;
        }
        header.title {
            font-size: 34px;
            margin-top: 20px;
            margin-bottom: 20px;
            color: #333;
        }
        .tag {
            margin-bottom: 25px;
        }
        .content {
            font-size: 18px;
            line-height: 1.8;
            p {
                margin-top: 8px;
                margin-bottom: 16px;
            }
        }
    }
    >.tag {
        margin-top: 45px;
        span {
            cursor: pointer;
            margin-right: 4px;
            padding: 4px 14px;
            border-radius: 2px;
            background: lighten(@gray, 40%);
            color: @gray;
            font-size: 14px;
        }
    }
    .from {
        margin-top: 40px;
        margin-bottom: 60px;
        .btn {
            width: 100%;
            font-size: 20px;
        }
    }
    .comments {
        .comment {
            position: relative;
            margin-bottom: 42px;
            .com.avatar {
                position: absolute;
                display: inline-block;
                width: 50px;
                height: 50px;
                overflow: hidden;
                border-radius: 100%;
                box-shadow: 0 5px 20px -5px @gray;
                img {
                    width: 50px;
                    height: 50px;
                }
            }
            .content {
                box-sizing: border-box;
                padding-left: 75px;
                width: 100%;
                header.username {
                    font-size: 20px;
                    margin-bottom: 6px;
                }
                .text {
                    margin-bottom: 10px;
                }
                .time {
                    display: inline-block;
                    font-size: 14px;
                    color: @gray;
                    margin-right: 20px;
                }
                .tag {
                    display: inline-block;
                    font-size: 14px;
                    color: @gray;
                    i {
                        font-size: 14px;
                        margin-right: 2px;
                    }
                    span {
                        margin-right: 6px;
                    }
                }
            }
            .my-comments-all {
                cursor: pointer;
                position: absolute;
                right: 0;
                bottom: 0;
                i.iconfont {
                    margin-right: 4px;
                    vertical-align: middle;
                }
            }
        }
    }
}
.m-comments {
    padding: 0 20px;
    label {
        display:block;
        margin-top: 10px;
        margin-bottom: 4px;
    }
    input {
        width: 100%;
    }
    textarea {
        width: 100%;
        min-height: 50px;
        max-width: 100%;
        max-height: 100px;
    }
}
</style>
<script>
import popover from "../components/popover"
import comments from "./r/comment-modal"
import commentsAll from "./r/comment-modal-all"
export default {
    data(){
        return {
            c_isshow:false,
        }
    },
    components:{
        popover,
        comments,
        commentsAll
    },
    methods:{
        comment(){
            this.c_isshow = true;
        }
    }
}
</script>