<template>
    <div class="admin-article">
        <h2 class="title">
            文章列表
        </h2>
        <div class="box">
            <div class="content">
                <div class="new">
                    <y-button>新建文章</y-button>
                </div>
                <div class="list">
                    <table>
                        <thead>
                            <tr>
                                <th width="20px"><y-checkbox></y-checkbox></th>
                                <th>文章标题</th>
                                <th>最近更新</th>
                                <th>文章状态</th>
                                <th>文章操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="articles in data">
                                <td><y-checkbox v-model="test" :label="articles._id"></y-checkbox></td>
                                <td>{{articles.title}}</td>
                                <td>{{articles.time[1]}}</td>
                                <td>{{articles.enabled}}</td>
                                <td><y-button type="ghost"  color="red">删除</y-button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
        table {
            width: 100%;
            overflow: auto;
            thead{
                tr {
                    th{
                        padding: 4px 6px;
                        text-align: left;
                        font-weight: 400;
                        color: #9ba3af;
                    }
                }
            }
            tbody {
                border: 1px solid #e9e9e9;
                padding: 6px 0;
                tr {
                    padding: 6px 0;
                    td {
                        padding: 6px 0;
                        padding: 4px 6px;
                        text-align: left;
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
</style>