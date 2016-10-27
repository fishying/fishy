<template>
    <div id="app">
        <header-index></header-index>
        <div class="main">
            <router-view></router-view>
        </div>
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
.main {
    width: 660px;
    margin: 0 auto;
}
</style>
