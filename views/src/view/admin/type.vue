<template>
    <div class="admin-type">
        <h2 class="title">
            文章列表
        </h2>
        <div class="list">
            <table>
                <thead>
                    <tr>
                        <th width="92"><y-checkbox></y-checkbox>全选</th>
                        <th>名称</th>
                        <th>文章数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="articles in data">
                        <td><y-checkbox v-model="test" :label="articles._id" content></y-checkbox></td>
                        <td class="title">{{articles.title}}</td>
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
            data:[]
        }
    },
    created(){
        this.$store.dispatch("getType")
    }
}
</script>