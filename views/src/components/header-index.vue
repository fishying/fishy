<template>
	<header class="index" :class="{'open':menu}">
		<router-link to="/" class="logo">W</router-link>
		<nav>
			<a href="">Home</a>
			<a href="">Home</a>
			<a href="">Home</a>
			<a href="">Home</a>
		</nav>
		<div class="menu" @click="navBtn">
			<span class="t"></span>
			<span class="b"></span>
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
		}
	}
}
</script>
<style lang="less">
header.index {
	position: relative;
	width: 900px;
	margin: 0 auto;
	padding: 30px 0;
	display: flex;
	background: #fff;
    z-index: 999;
	&.open {
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
		font-size: 38px;
		font-weight: 700;
		text-decoration: none;
		color: #111;
		margin-right: 22px;
	}
	nav {
		padding: 12px 6px;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
		text-align: center;
		a {
			text-decoration: none;
			color: #b3b3b3;
			margin-right: 22px;
			font-size: 14px;
		}
		i {
			font-size: 54px;
			color: #666;
		}
	}
	.menu {
		margin-top: 16px;
		position: relative;
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
			background: #111;
			&.t {
				top: 0;
			}
			&.b {
				bottom: 0;
			}
		}
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
		}
	}
}
</style>