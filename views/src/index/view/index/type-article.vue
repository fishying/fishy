<template>
    <div class="type-article container">
        <types
            :name="data.name"
            :content="data.profile"
            :articles="data.article"
            v-if="loading"
        >
        </types>
    </div>
</template>
<script>
import types from "../../../components/type"
export default {
    data(){
        return {
            data:{},
            loading:false,
        }
    },
    created(){
        this.$store.dispatch("getTypeArticle",this.$route.params.id)
        .then(data=>{
            this.data = data
            this.loading = true
        })
    },
    components:{
        types
    }
}
</script>