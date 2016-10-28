<template>
    <article class="main">
        <article-index path="article"></article-index>
    </article>
</template>
<script>
import articleIndex from "../components/article-index"
export default {
	mounted(){
		this.$http.post("/api/checklogin")
		.then(function(response) {
            return response.json()
		}).then(function(data) {
            if(data.status == "success"){
                this.$notify("已经登陆啦")
            }
		})
	},
    components:{
        articleIndex
    }
}
</script>
<style lang="less">
@media (max-width: 940px) {
    article.main {
        width: 600px;
    }
}
@media (max-width: 600px) {
    article.main {
        width: 100%;
    }
}
</style>