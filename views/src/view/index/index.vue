<template>
    <article class="main">
        <article-index :path="`/article/${article._id}`" :data="article" v-for="article in data"></article-index>
    </article>
</template>
<script>
import articleIndex from "../../components/article-index"
export default {
    components:{
        articleIndex
    },
    mounted(){
        console.log(this.$store)
        this.$store.dispatch("getindex")
    },
    computed:{
        "data":function(){
            return this.$store.state.index.article
        }
    }
}
</script>