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
        console.log(this.$route)
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
.opacity {
  transition: opacity .5s
}
.opacity-enter-active, .opacity-leave-active {
  transition: opacity .5s
}
.opacity-enter, .opacity-leave-enter, .opacity-leave-active {
  opacity: 0
}
</style>
