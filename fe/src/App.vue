<template>
  <div>
      <router-view></router-view>
      <y-Modal></y-Modal>
      <y-notification></y-notification>
  </div>
</template>
<style >
#app {
  margin-top: 15px;
  margin-left: 100px;
}
</style>
<script>

import yModal from "./components/modal"

import yNotification from "./components/notification"

export default {
    ready: function (){
      this.$http.get("/api/index",{ 
          t:0
      }).then((response)=>{
          console.log(response.json())
      })
    },
    components:{
        yModal,
        yNotification
    }
}
</script>