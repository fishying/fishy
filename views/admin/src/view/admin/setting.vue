<template>
    <div class="admin-setting container">
        <div class="setting-left">
            预览：
            <div class="list-header">
                <a class="logo">
                    <logos :width="44" color="#666"></logos>
                </a>
                <ul>
                    <li  v-for="list in newData">{{list.name}}</li>
                </ul>
            </div>
            <div class="nav-form">
                <label>
                    <input type="text" v-model="listName" placeholder="标签名称">
                </label>
                <label>
                    <input type="text" v-model="listPath" placeholder="标签路径">
                </label>
                <p><y-button @click.native="addList" type="ghost">添加一个</y-button></p>
            </div>
            <y-button @click.native="add" type="ghost">发布</y-button></p>
        </div>
    </div>
</template>
<script>
import logos from "../../components/logo"
export default {
    data(){
        return {
            data:[],
            newData:[],
            listName:"",
            listPath:""
        }
    },
    created(){
        this.$http.get("/api/nav/list")
            .then(e=>{
                this.data = e.data.data
            })
    },
    methods:{
        addList(){
            this.newData.push({
                name:this.listName,
                path:this.listPath
            })
        },
        add(){
            this.$http.post("/api/nav/list",{
                list:this.newData
            })
            .then(e=>{
                console.log(e)
            })
        }
    },
    components:{
        logos
    }
}
</script>
<style lang="less">
.admin-setting {
    .list-header {
        padding: 6px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {

            font-size: 38px;
        }
        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            li {
                color: fade(#000, 65%);
                margin-right: 22px;
                font-size: 16px;
            }
        }
    }
    .nav-form {
        input {
            width: 100%;
            font-size: 24px;
            padding: 6px 0;
            outline: none;
            border: none;
            resize: none;
        }
    }
}
</style>