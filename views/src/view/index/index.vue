<template>
    <article class="main">
        <article-index :path="`/article/${article._id}`" :data="article" v-for="article in data"></article-index>
    </article>
</template>
<script>
import articleIndex from "../../components/article-index"
export default {
    data(){
        return {
            data:[]
        }
    },
    components:{
        articleIndex
    },
    created(){
        this.$store.dispatch("getIndex")
        .then(data=>{
            this.data = data
        }).catch(err=>{
            
        })
    }
}
</script>