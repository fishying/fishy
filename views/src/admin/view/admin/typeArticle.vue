<template>
    <div class="admin-type-article main" v-if="loading">
        <h2 class="title">
            {{data.name}} 标签文章列表
        </h2>
        <div class="list">
            <table  v-if="data.article.length !==0">
                <thead>
                    <tr>
                        <th width="92"><y-checkbox></y-checkbox>全选</th>
                        <th>文章标题</th>
                        <th>最近更新</th>
                        <th>文章状态</th>
                        <th>文章操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="articles in data.article" :key="articles._id">
                        <td>
                        <y-checkbox v-model="test" :label="articles._id" content></y-checkbox></td>
                        <td class="title"><router-link :to="`/up/article/${articles._id}`">{{articles.title}}</router-link></td>
                        <td class="time">{{articles.create_time[1]}}</td>
                        <td class="enabled">{{articles.enabled}}</td>
                        <td class="t">
                        <y-button type="ghost" color="red" slot="html">删除</y-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="none" v-else>还没有发布文章~快来写一篇吧~ <router-link to="/add/article">添加</router-link></p>
        </div>
    </div>
</template>
<style lang="less">
.list {
    td {
        min-width: 12px;
    }
}
</style>
<script>
export default {
    data(){
        return {
            test:[],
            data:[],
            alias:this.$route.params.alias,
            loading:false
        }
    },
    methods:{
        getIndex(){
            this.$store.dispatch("getTypeArticle",this.$route.params.alias)
            .then(data=>{
                console.log(data)
                this.data = data
                this.loading = true
            })
            .catch(e=>{
                this.$router.push("/404")
            })
        }
    },
    created(){
        this.getIndex()
    }
}
</script>