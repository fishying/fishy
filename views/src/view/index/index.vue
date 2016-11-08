<template>
    <article class="main container">
        <article-index :path="`/article/${article._id}`" :data="article" v-for="article in data" v-if="loading"></article-index>
    </article>
</template>
<script>
import articleIndex from "../../components/article-index"
export default {
    data(){
        return {
            data:[],
            loading:false
        }
    },
    components:{
        articleIndex
    },
    created(){
        this.$store.dispatch("getIndex")
        .then(data=>{
            this.data = data
            this.loading = true
        }).catch(err=>{
            
        })
    }
}
</script>