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
.posts-end {
    position: relative;
    text-align: center;
    display: block;
    margin: 20px auto;
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        width: 340px;
        height: 1px;
        left: 50%;
        margin-top: -2px;
        margin-left: -170px;
        background: rgba(0,0,0,.1);
    }
    i {
        padding: 0 12px;
        position: relative;
        font-size: 42px;
        color: fade(#000, 40%);
        background: #fff;
        &:before {
            
            transform: rotate(-45deg);
        }
    }
}
</style>