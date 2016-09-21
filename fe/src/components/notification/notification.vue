<template>
    <div class="notification-box">
        <div class="notification" 
            v-for="item in data"
            transition="notification"
            :class="{
                'notification-success': item.type == 'success',
                'notification-info': item.type == 'info',
                'notification-warning': item.type == 'warning',
                'notification-danger': item.type == 'danger',
            }"

        >
            <i class="iconfont notification-info" :class="{
                'icon-checkcircle': item.type == 'success',
                'icon-infocircle': item.type == 'info',
                'icon-exclamationcircle': item.type == 'warning',
                'icon-crosscircle': item.type == 'danger',
            }"></i>
            <div class="notification-c">
                <h2 slot="title">{{item.title}}</h2>
                <p slot="description">{{item.content}}</p>
            </div>
            <i class="iconfont icon-cross notification-del" @click="dels(item)"></i>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        data(){
            return this.$root.GLOBAL_NOTIFICATION
        }
    },
    methods:{
        dels:function(item){
            this.$root.GLOBAL_NOTIFICATION.$remove(item)
        }
    }
}
</script>
<style lang="less">
@import "./notification";
</style>