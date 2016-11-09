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
.op-enter-active, .op-leave-active {
  transition: opacity .5s
}
.op-enter,.enter-active, .op-leave-active, .op-leave {
  opacity: 0
}
::selection {
    background: #eaeaea;
}
html {
    height: 100%;
}
body {
    height: 100%;
    overflow-y: scroll;
}
#app {
    height: 100%;
}
.container {
    width: 740px;
    margin: 0 auto;
}
@media (max-width: 940px) {
    .p-12 {
        padding-left: 12px;
        padding-right: 12px;
    }
}
.f-container {
    width: 100%;
    background-color: #f6f6f6;
    padding: 12px 0;
}
@media (max-width: 940px) {
    .container {
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
