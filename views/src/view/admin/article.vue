<template>
    <div class="admin-article">
        <h2 class="title">
            文章列表
        </h2>
        <div class="list">
            <table>
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
                    <tr v-for="articles in data">
                        <td><y-checkbox v-model="test" :label="articles._id" content></y-checkbox></td>
                        <td class="title">{{articles.title}}</td>
                        <td class="time">{{articles.time[1]}}</td>
                        <td class="enabled">{{articles.enabled}}</td>
                        <td class="t">

                        <y-popconfirm
                            title="是否删除该文章？"
                        >
                             <y-button type="ghost" color="red" slot="html">删除</y-button>
                        </y-popconfirm>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            test:[]
        }
    },
    methods:{
        delArticle(id){
            this.$store.dispatch("delArticle", id)
            .then(test=>{
                this.$notify("删除成功")
                this.$store.dispatch("getIndex")
            })
        }
    },
    created(){
        this.$store.dispatch("getIndex")
    },
    computed:{
        "data":function(){
            return this.$store.state.index.articles
        }
    }
}
</script>
<style lang="less">
.admin-main {
    .list {
        overflow: auto;
        table thead tr th{
            font-weight:700
        }
        table{
            border:1px solid #e9e9e9
        }
        table thead{
            background:#f7f7f7
        }
        table thead tr{
            border-bottom:1px solid #e9e9e9
        }
        table thead tr th{
            padding:6px 0;
            border-left:1px solid #e9e9e9
        }
        table tbody tr{
            border-bottom:1px solid #e9e9e9;
            vertical-align:middle;
        }
        table tbody tr td{
            padding:12px 18px;
            border-left:1px solid #e9e9e9;
            vertical-align:middle;
        }
        .title {
            min-width: 265px;
        }
        .time {
            min-width: 105px;
        }
        .enabled {
            min-width: 80px;
        }
        .title {
            min-width: 265px;
        }
    }
}
</style>