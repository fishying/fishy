<template>
    <header class="admin">
        <nav>
            <router-link to="/" class="logo" exact>W</router-link>
            <router-link 
                :to="info.path" 
                v-for="info in nav" 
                exact
            >
                <i :class="info.icon"></i>
            </router-link>
        </nav>
        <div class="admin">
        <router-link to="/admin/add/article">
            <i class="ion-ios-plus-empty admin"></i>
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
    {
        path:"/admin/actic",
        icon:"ion-ios-gear-outline"
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
    height: 60px;
    width: 100%;
    border: 1px solid #efefef;
    nav,.admin{
        display: flex;
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
            color: #666;
            text-decoration: none;
            opacity: .8;
            &:hover {
                opacity: 1;
            }
            &.router-link-active {
                opacity: 1;
                background: #eaeaea;
            }
        }   
    }
    >.admin {
        position: absolute;
        right: 0;
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                font-size: 38px;
            }
        }
    }
}

@media (max-width: 940px) {
}
@media (max-width: 600px) {
}
</style>