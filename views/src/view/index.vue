<template>
    <div class="indexs">
        <headers></headers>
        <div class="main">
            <transition name="op" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>

import headers from "../components/header-index"
export default {
    mounted(){
        document.body.style.background = "#fff"
    },
    components:{
        headers
    }
}
</script>
<style lang="less">
.indexs {
    padding-top: 65px;
    .main {
        padding: 22px 0 42px 0;
    }
}
@media (max-width: 940px) {
    article.main {
        width: 600px;
    }
}
@media (max-width: 600px) {
    article.main {
        width: 100%;
    }
}
</style>