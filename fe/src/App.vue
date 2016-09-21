<template>
  <div>
      <router-view></router-view>
      <y-Modal></y-Modal>
      <y-notification></y-notification>
  </div>
</template>
<style lang="less">
@import "./assets/style/init";
body {
	background: #fbfcfc;
}
</style>
<script>

import yModal from "./components/modal"

import yNotification from "./components/notification"

export default {
    components:{
        yModal,
        yNotification
    }
}
</script>