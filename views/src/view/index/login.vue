<template>
    <div class="container p-12">
        <div class="login">
            <h2 class="index-title">登陆</h2>
            <label>
                <p>账号：</p>
                <input type="text" v-model="name">
            </label>
            <label>
                <p>密码：</p>
                <input type="password" v-model="password">
            </label>
            <y-button type="ghost" @click.native="login">登陆</y-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name:"",
            password:""
        }
    },
    methods:{
        login(){
            this.$http.post("/api/login",{
                name:this.name,
                password: this.password
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                if(data.status == "success"){
                    this.$notify("登陆成功~")
                    this.$router.push("/admin")
                }else {
                    this.$notify.warning("登陆失败~")
                    this.$router.push("/")
                }
            })
        }
    }
}
</script>
<style lang="less">
.login {
    width: 320px;
    margin: 0 auto;
    h2.index-title {
        text-align: center;
        font-size: 28px;
    }
    label {
        p {
            margin: 8px 0;
        }
        input {
            width: 100%;
            display: block;
            outline: none;
            padding: 8px 12px;
            font-size: 18px;
            color: #111;
            border: 1px #cfcfcf solid;
            border-radius: 4px;
        }
    }
    .y-btn {
        font-size: 16px;
        margin-top: 12px;
        display: block;
        width: 100%;
        line-height: 1.6;
    }
}
</style>