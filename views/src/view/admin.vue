<template>
    <div class="admins">
        <headers></headers>
        <div class="admin-main">
            <transition name="op" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import headers from "../components/header-admin"

export default {
    components:{
        headers
    },
}
</script>
<style lang="less">
.admins {
    width: 100%;
    height: 100%;
}

.admin-main {
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
            border: 1px solid #d6d6d6;
            border-radius: 2px;
            &:hover {
                box-shadow: 0 10px 15px -5px #ccc
            }
        }
    }
}
</style>