<template>
    <div id="app">
        <header-index></header-index>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
// import store from "./store"

import headerIndex from "./components/header-index"

export default {
    components:{
        headerIndex
    }
}
</script>
<style lang="less">
@import "./styles/init";
html {
    height: 100%;
}
body {
    height: 100%;
}
#app {
    height: 100%;
}
.main {
    width: 660px;
    margin: 0 auto;
}
@media (max-width: 940px) {
    .main {
        width: 100%;
    }
}
</style>
