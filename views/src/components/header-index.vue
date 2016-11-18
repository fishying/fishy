<template>
    <transition name="index-header" appear>
        <header class="index" :class="{
            'open':menu,
            'border': scrolls == 0,
            'display': scrolls == 1,
        }">
            <div class="container">
                <router-link to="/" class="logo">
                    <!--
                    <div class="logos">
                        <span class="t"></span>
                        <span class="b"></span>
                        <span class="l"></span>
                        <span class="r"></span>
                    </div>
                    -->
                    <logos :width="50" color="rgba(0, 0, 0, 0.6)"></logos>
                </router-link>
                <nav>
                    <router-link to="/admin">Home</router-link>
                    <router-link to="/">Home</router-link>
                    <router-link to="/">Home</router-link>
                    <router-link to="/logon">logon</router-link>
                    <router-link to="/login">login</router-link>
                    <a @click="logout">logout</a>
                </nav>
                <div class="menu" @click="navBtn">
                    <span class="t"></span>
                    <span class="b"></span>
                </div>
            </div>
        </header>
    </transition>
</template>
<script>
import {debounce, scroll} from "../uilt"
import logos from "./logo"
export default {
    data(){
        return {
            menu:false,
            scrolls:0,
        }
    },
    mounted(){
        let self = this
        window.addEventListener("resize", function(){
            if(self.menu) {
                self.menu = false
            }else {
                return
            }
        })
        window.addEventListener("scroll", function(){
            if(self.menu) {
                self.menu = false
            }else {
                return
            }
        })
        scroll(function(e){
            self.scroll(e)
        })
    },
    methods:{
        navBtn(){
            this.menu ? this.menu = false : this.menu = true
        },
        logout(){
            this.$store.dispatch("logout")
            .then()
        },
        scroll(e){
            if(document.body.scrollTop == 0){
                this.scrolls = 0
            }else if(document.body.scrollTop >= 120){
                if(e){
                    this.scrolls = 1
                }else {
                    this.scrolls = -1
                }
            }else {
                this.scrolls = -1
            }
        }
    },
    watch:{
        "$route":function(value){
            if(this.menu) {
                this.menu = false
            }else {
                return
            }
        }
    },
    components:{
        logos
    }
}
</script>
<style lang="less">
.cls-1{fill:none;stroke:#231815;stroke-miterlimit:10;stroke-width:4px;}
header.index {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    z-index: 997;
    background: fade(#fff, 98%);
    border-bottom: 1px solid fade(#000, 4%);
    transition: 0.3s transform;
    &.border {
        border-bottom: 1px solid fade(#000, 0%);
    }
    &.display {
        transform: translateY(-100%);
    }
    .container {
        padding: 6px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &.open {
        background: #fff;
        .menu {
            span.t {
                transform: rotate(45deg);
                margin-top: 4px;
            }
            span.b {
                transform: rotate(-45deg);
                margin-bottom: 4px;
            }
        }
        nav {
            max-height: 600px;
            display: block;
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            opacity: 1 !important;
        }
    }
    .logo {
        width: 36px;
        font-size: 38px;
        font-weight: 700;
        text-decoration: none;
        color: fade(#000, 70%);
        .logos {
            position: relative;
            width: 72px;
            height: 42px;
            cursor: pointer;
            span {
                transition: all .3s cubic-bezier(.645,.045,.355,1);
                position: absolute;
                display: block;
                height: 2px;
                background: rgb(75, 75, 75);
                &.l {
                    width: 32px;
                    transform: rotate(-26deg);
                    top: 13px;
                    left: 0;
                }
                &.r {
                    width: 32px;
                    transform: rotate(26deg);
                    bottom: 13px;
                    left: 0;
                }
                &.t {
                    width: 32px;
                    transform: rotate(40deg);
                    left: 25px;
                    top: 18px;
                }
                &.b {
                    width: 32px;
                    transform: rotate(-40deg);
                    left: 25px;
                    bottom: 18px;
                }
            }
        }
    }
    nav {
        padding: 12px 6px;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        text-align: center;
        a {
            transition: color .3s cubic-bezier(.645,.045,.355,1);
            text-decoration: none;
            color:  fade(#000, 45%);
            margin-right: 22px;
            font-size: 16px;
            &:hover {
                color: #47b8e0;
            }
        }
    }
    .menu {
        position: relative;
        display: none;
        opacity: 0;
        width: 25px;
        height: 14px;
        cursor: pointer;
        span {
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            position: absolute;
            display: block;
            width: 100%;
            height: 2px;
            background: rgba(0,0,0,0.7);
            &.t {
                top: 0;
            }
            &.b {
                bottom: 0;
            }
        }
    }
    .search {
        text-align: right;
        width: 36px;
        height: 42px;
        i {
            line-height: 42px;
            display: block;
        }
        font-size: 24px;
    }
}

@media (max-width: 940px) {
    header.index {
        width: 100%;
        padding-left: 12px;
        padding-right: 12px;
        justify-content: space-between;
        .menu {
            opacity: 0;
        }
    }
}
@media (max-width: 600px) {
    header.index {
        nav {
            position: absolute;
            top: 60px;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            left: 0;
            position: absolute;
            width: 100%;
            background: #fff;
            a {
                padding: 12px;
                display: block;
            }
        }
        .menu {
            opacity: 1;
            display: block;
        }
    }
}
.index-header-enter-active, .index-header-leave-active {
    transition: transform .5s
}
.index-header-enter, .index-header-leave-active {
    transform: translateY(-100%);
}
</style>