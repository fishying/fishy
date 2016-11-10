<template>
    <header class="index" :class="{'open':menu}">
        <div class="container">
            <router-link to="/" class="logo">W</router-link>
            <nav>
                <router-link to="/admin">Home</router-link>
                <router-link to="/">Home</router-link>
                <router-link to="/">Home</router-link>
                <router-link to="/logon">Home</router-link>
                <router-link to="/login">Home</router-link>
                <router-link to="/login">logout</router-link>
            </nav>
            <div class="menu" @click="navBtn">
                <span class="t"></span>
                <span class="b"></span>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data(){
        return {
            menu:false,
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
    },
    methods:{
        navBtn(){
            this.menu ? this.menu = false : this.menu = true
        },
        logout(){
            this.$http.post("/api/logout")
            .then(data=>{
                console.log(data)
            })
        }
    }
}
</script>
<style lang="less">
header.index {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    z-index: 997;
    background: fade(#fff, 98%);
    border-bottom: 1px solid fade(#000, 4%);
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
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            left: 0;
            position: absolute;
            width: 100%;
            margin-top: 60px;
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
</style>