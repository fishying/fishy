<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>

import headerIndex from "./components/header-index"

export default {
    components:{
        headerIndex
    },
    mounted(){
    }
}
</script>
<style lang="less">
@import "./styles/init";
#app {
    height: 100%;
}
</style>
