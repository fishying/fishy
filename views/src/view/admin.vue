<template>
    <div class="admins">
        <headers></headers>
        <div class="admin-main"><router-view></router-view></div>
    </div>
</template>
<script>
import headers from "../components/header-admin"

export default {
    components:{
        headers
    },
    mounted(){
        document.body.style.background = "#ececec"
    }
}
</script>
<style lang="less">
.admins {
    width: 100%;
    height: 100%;
}

.admin-main {
    margin-left: 80px;
    box-sizing: border-box;
    padding: 22px;
    h2.title {
        font-size: 22px;
        font-weight: 400;
    }
    .box {
        .content{
            transition: .3s all;
            background: #fff;
            padding: 24px;
            height: 100%;
            &:hover {
                box-shadow: 0 10px 15px -5px #ccc
            }
        }
    }
}
@media (max-width: 940px) {
    .admin-main {
        margin-left: 60px;
    }
}
@media (max-width: 600px) {
    .admin-main {
        margin-left: 0;
        margin-top: 60px;
    }
}
</style>