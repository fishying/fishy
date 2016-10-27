<template>
    <article class="main">
        <article class="index">
            <h2 class="title"><a href="">简单</a></h2>
            <div class="meta">
                <span>
                    <a href="">test</a>
                     · 
                    <a href="">1 天前</a>
                </span>
            </div>
            <img src="http://imgpoobbs.b0.upaiyun.com/uploadfile/photo/2016/10/201610242320501572284829.jpg!photo.middle.jpg" class="index-img">
            <p class="outline">
                在我们日常的设计过程中总会遇到些一时难以解决的问题：这个功能放在这里似乎不太对，可是其他位置更不对；在修复一些体验问题时发现页面结构在长期的迭代后做出这种修改的代价过大；
            </p>
            <p class="read-all"><a href="" >--阅读全文--</a></p>
        </article>
        <article class="index">
            <h2 class="title"><a href="">简单</a></h2>
            <div class="meta">
                <span>
                    <a href="">test</a>
                     · 
                    <a href="">1 天前</a>
                </span>
            </div>
            <img src="http://imgpoobbs.b0.upaiyun.com/uploadfile/photo/2016/10/201610242320501572284829.jpg!photo.middle.jpg" class="index-img">
            <p class="outline">
                在我们日常的设计过程中总会遇到些一时难以解决的问题：这个功能放在这里似乎不太对，可是其他位置更不对；在修复一些体验问题时发现页面结构在长期的迭代后做出这种修改的代价过大；所有的东西都被摆在了重要的位置，那真正重要的东西应该在哪里？当一个用户来到一个页面，他真正想做的事情是什么？……当这些问题越来越多的时候我们开始想：是不是应该重新考虑知乎网页版应该是什么样子了？
            </p>
        </article>
    </article>
</template>
<script>
export default {
	mounted(){
		this.$http.get("/api/index?t=1")
		.then(function(json) {
			console.log(json)
		}).catch(function(ex) {
			console.log(ex)
		})
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
    img.index-img {
        width: 106%;
        margin: 12px 0 12px -3%;
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
</style>