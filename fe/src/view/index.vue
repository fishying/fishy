<template>
    <y-header></y-header>
    <router-view></router-view>
</template>
<script>
import yHeader from "./r/header"

export default {
    components:{
        yHeader,
    }
}
</script>
