<template>
    <div class="admin-type">
        <h2 class="title">
            标签列表
        </h2>
        <div class="list">
            <table v-if="data.length!=0">
                <thead>
                    <tr>
                        <th width="92"><y-checkbox></y-checkbox>全选</th>
                        <th>名称</th>
                        <th>文章数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="type in data">
                        <td><y-checkbox v-model="test" :label="type._id" content></y-checkbox></td>
                        <td class="title">{{type.name}}</td>
                        <td class="num">{{type.article.length}}</td>
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
            <p class="none" v-else>还没有标签~ <router-link to="/admin/add/type">添加一个标签</router-link></p>
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
        this.$store.dispatch("getType")
    },
    computed:{
        data:function(){
            return this.$store.state.index.types
        }
    }
}
</script>