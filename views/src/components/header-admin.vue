<template>
    <header class="admin">
        <nav>
            <router-link to="/" class="logo">W</router-link>
            <router-link 
                :to="info.path" 
                v-for="info in nav" 
                :class="{ 'active':$route.path == info.path }"
            >
                <i :class="info.icon"></i>
            </router-link>
        </nav>
        <div class="admin">
        <router-link to="admin">
            <i class="ion-ios-gear-outline admin"></i>
        </router-link>
        </div>
    </header>
</template>
<script>
const nav = [
    {
        path:"/admin",
        icon:"ion-ios-home-outline"
    },
    {
        path:"/admin/article",
        icon:"ion-ios-list-outline"
    },
    {
        path:"/admin/type",
        icon:"ion-ios-pricetag-outline"
    },
    {
        path:"/admin/acticless",
        icon:"ion-ios-chatbubble-outline"
    },
]
export default {
    data(){
        return {
            nav:nav
        }
    },
    mounted(){
        console.log(this.$route)
    }
}
</script>
<style lang="less">
header.admin {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 80px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 0;
    background-color: #3e474e;
    nav,.admin{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        a {
            transition: .3s all;
            display: block;
            width: 60px;
            height: 60px;
            min-height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 32px;
            color: #fff;
            text-decoration: none;
            opacity: .4;
            border-radius: 8px;
            &.active {
                background: #353c43;
                opacity: 1;
                a,i {

                    opacity: 1;
                }
            }
            &:hover {
                opacity: 1;
            }
        }   
    }
}

@media (max-width: 940px) {
    header.admin {
        width: 60px;
    }
}
@media (max-width: 600px) {
    header.admin {
        width: 100%;
        height: 60px;
        flex-direction: row !important;
    }
    nav,.admin{
        flex-direction: row !important;
    }
}
</style>