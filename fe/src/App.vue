<template>
    <div id="app">
        <header-index></header-index>
        <router-view></router-view>
    </div>
</template>
<script>
import headerIndex from "./components/header-index"

export default {
    components:{
        headerIndex
    }
}
</script>
<style lang="less">
@import "./styles/init";
</style>
