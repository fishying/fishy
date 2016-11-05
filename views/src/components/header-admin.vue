<template>
    <header class="admin">
        <nav>
            <router-link to="/" class="logo">W</router-link>
        </nav>
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
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    ba
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
            border-radius: 8px;
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