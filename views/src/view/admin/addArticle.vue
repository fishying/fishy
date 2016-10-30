<template>
    <div class="add-article">
        <div class="box">
            <div class="content">
                <input type="text" v-model="title">
                <textarea v-model="content"></textarea>
                <y-button @click.native="add">提交</y-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            title:"",
            content:""
        }
    },
    methods:{
        add(){
            this.$http.post("/api/admin/add",{
                title:this.title,
                content:this.content,
                tags:[""]
            }).then((response,err) => {
                console.log(response)
                console.log(err)
            })
        }
    }
}
</script>